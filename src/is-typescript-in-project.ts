import process from "process";
import path from "path";
import fs from "fs/promises";

export async function pathContainsItem(
  path: string,
  itemName: string,
): Promise<boolean> {
  const files = await fs.readdir(path);

  return files.includes(itemName);
}

export async function isTypeScriptInProject(): Promise<boolean> {
  let currentPath = process.cwd();
  let prevPath = "";

  while (currentPath !== prevPath) {
    if (await pathContainsItem(currentPath, "package.json")) {
      return (
        (await pathContainsItem(currentPath, "tsconfig.json")) ||
        (await pathContainsItem(currentPath, "tsconfig.spec.json")) ||
        (await pathContainsItem(currentPath, "tsconfig.editor.json")) ||
        (await pathContainsItem(currentPath, "tsconfig.app.json")) ||
        (await pathContainsItem(currentPath, "tsconfig.base.json"))
      );
    }

    prevPath = currentPath;
    currentPath = path.resolve(currentPath, "..");
  }

  return false;
}
