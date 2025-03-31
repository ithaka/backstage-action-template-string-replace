import { getAllTemplateFiles } from "./getAllTemplateFiles";
import { setupFileMocks } from "./testUtils/setupFileMocks";
import fs from "fs-extra";

jest.mock("fs-extra");
const mockPath = "/mock/path";

describe("getAllTemplateFiles", () => {
  it("returns all template files in a given directory", () => {
    setupFileMocks();
    const result = getAllTemplateFiles(mockPath);
    expect(result).toEqual([
      `${mockPath}/testInput.txt`,
      `${mockPath}/TestInput.txt`,
      `${mockPath}/test-input.txt`,
      `${mockPath}/testinput.txt`,
      `${mockPath}/some-directory/test_input.txt`,
      `${mockPath}/some-directory/TESTINPUT.txt`,
    ]);
  });

  it("skips .yarn/* files in a given directory", () => {
    // Set up sample directory structure with .yarn folder
    const someFiles = ["template1.txt", "template2.txt", ".yarn"];
    const someNestedFiles = ["template4.txt", "template5.txt"];
    (fs.readdirSync as jest.Mock)
      .mockReturnValueOnce(someFiles)
      .mockReturnValueOnce(someNestedFiles);
    (fs.statSync as jest.Mock)
      .mockReturnValueOnce({ isDirectory: () => false })
      .mockReturnValueOnce({ isDirectory: () => false })
      .mockReturnValueOnce({ isDirectory: () => true })
      .mockReturnValue({ isDirectory: () => false });

    const result = getAllTemplateFiles(mockPath);
    expect(result).toEqual([
      `${mockPath}/template1.txt`,
      `${mockPath}/template2.txt`,
    ]);
  });
});
