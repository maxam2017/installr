import { execSync } from "child_process";

export function runCommands(commands: string[]) {
  let returned;
  for (const command of commands) {
    returned = runCommand(command);
  }

  return returned;
}

function runCommand(command: string) {
  try {
    const stdout = execSync(command, { stdio: "ignore" });
    const output = stdout?.toString();

    return output.trim();
  } catch (error) {
    throw error;
  }
}
