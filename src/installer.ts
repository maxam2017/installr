import { runCommands } from "./utils";
import { topologicalGroup } from "./topology";
import Listr from "listr";
import { Observable } from "rxjs";
import chalk from "chalk";
import boxen from "boxen";

export async function installPackages(config: any) {
  // Build a graph of dependencies for topological grouping
  const dependencyGraph: Record<string, string[]> = {};
  config.packages.forEach((packageInfo: any) => {
    const packageName = packageInfo.name;
    const dependencies = packageInfo.dependencies || [];
    dependencyGraph[packageName] = dependencies;
  });

  // Group packages by dependencies
  const groups = topologicalGroup(dependencyGraph);

  const logs: string[] = [];

  // Install each group of packages in parallel
  const tasks = new Listr(
    groups.map((group, index) => ({
      title: `Installation${(index + 1)
        .toString()
        .padStart(3, "0")}: ${group.join(", ")}`,
      task: () => {
        return new Listr(
          group.map((packageName) => {
            const packageInfo = config.packages.find(
              (pkg: any) => pkg.name === packageName
            );

            return {
              title: packageName,
              skip: async () => {
                if (!packageInfo) {
                  return "Package not found";
                }
                if (packageInfo.checkInstalled) {
                  try {
                    runCommands(packageInfo.checkInstalled);

                    return `Package ${packageName} is already installed`;
                  } catch (error) {}
                }
              },
              task: async () => {
                const { installScript, beforeInstall, afterInstall } =
                  packageInfo;

                const pkgLog: string[] = [];

                return new Observable((observer) => {
                  if (beforeInstall) {
                    observer.next(`🪝 Running beforeInstall hook...`);
                    const output = runCommands(beforeInstall);
                    if (output) {
                      pkgLog.push(
                        "  beforeInstall",
                        ...output
                          .split("\n")
                          .map((line: string) => `    ${chalk.dim(line)}`),
                        ""
                      );
                    }
                  }

                  observer.next(`📦 Installing...`);
                  const output = runCommands(installScript);
                  if (output) {
                    pkgLog.push(
                      "  install",
                      ...output
                        .split("\n")
                        .map((line: string) => `    ${chalk.dim(line)}`),
                      ""
                    );
                  }

                  if (afterInstall) {
                    observer.next(`🪝 Running afterInstall hook...`);
                    const output = runCommands(afterInstall);
                    if (output) {
                      pkgLog.push(
                        "  afterInstall",
                        ...output
                          .split("\n")
                          .map((line: string) => `    ${chalk.dim(line)}`),
                        ""
                      );
                    }
                  }

                  if (pkgLog.length) {
                    logs.push(chalk.cyanBright(packageName), ...pkgLog);
                  }

                  observer.complete();
                });
              },
            };
          }),
          {
            concurrent: true,
          }
        );
      },
    }))
  );

  try {
    console.log("🚀 Installing packages...");
    await tasks.run();
    console.log("✅ All packages installed successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(
    "\n" +
      boxen(logs.join("\n").trim(), {
        padding: 1,
        title: "Below is the log of the installation process",
        borderColor: "gray",
        borderStyle: "double",
      })
  );
}
