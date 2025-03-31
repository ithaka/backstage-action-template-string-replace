import fs from "fs-extra";

/**
 * Recursively gets all files in a directory and its subdirectories.
 *
 * @param dirPath - The path of the directory to start from.
 * @returns An array of full paths to all files in the directory and its subdirectories.
 */
export const getAllTemplateFiles = (dirPath: string): string[] => {
  const directoryContents = fs.readdirSync(dirPath);
  return directoryContents.flatMap((item) => {
    const fullPath = `${dirPath}/${item}`;
    // Skip .yarn folder to speed things up
    if (fullPath.includes("/.yarn/")) {
      return [];
    }
    if (fs.statSync(fullPath).isDirectory()) {
      return getAllTemplateFiles(fullPath);
    }
    return fullPath;
  });
};
