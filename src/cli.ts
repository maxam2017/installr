import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import { loadConfigFile } from "./config-loader";
import { validateConfig } from "./config-validator";
import { installPackages } from "./installer";
import { readPackageSync } from "read-pkg";

const pkg = readPackageSync();

const { argv } = yargs(hideBin(process.argv))
  .usage("Usage: $0 <config-file> [options]")
  .version(pkg.version)
  .detectLocale(false)
  .example(
    "$0 config.json",
    "Install packages based on the provided configuration file"
  )
  .demandCommand(1, "Please provide the path to the configuration file")
  .help("h")
  .alias("h", "help")
  .alias("v", "version");

const configFile = (argv as any)._[0];

async function main() {
  const config = await loadConfigFile(configFile);
  validateConfig(config); // throw if invalid

  await installPackages(config);
}

main();
