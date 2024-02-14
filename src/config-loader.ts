import { extname } from "path";
import { load } from "js-yaml";
import { file } from "bun";

export async function loadConfigFile(configFile: string) {
  try {
    const fileExtension = extname(configFile).toLowerCase();

    if (fileExtension === ".json") {
      const configData = await file(configFile).text();
      return JSON.parse(configData);
    } else if (fileExtension === ".yaml" || fileExtension === ".yml") {
      const configData = await file(configFile).text();
      return load(configData);
    } else {
      console.error("Unsupported file type. Please use a JSON or YAML file.");
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error reading or parsing the configuration file: ${error}`);
    process.exit(1);
  }
}
