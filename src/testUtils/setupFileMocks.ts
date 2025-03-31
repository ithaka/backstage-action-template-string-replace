import fs from "fs-extra";

/**
 * Sets up file system mocks for testing.
 *
 * This function configures `fs.readdirSync` and `fs.statSync` to return mock data that represents a
 * specific directory structure.
 *
 */
export const setupFileMocks = () => {
  const someFiles = [
    "testInput.txt",
    "TestInput.txt",
    "test-input.txt",
    "testinput.txt",
    "some-directory",
  ];
  const someNestedFiles = ["test_input.txt", "TESTINPUT.txt"];
  // Set up fs mocks to match test directory structure
  (fs.readdirSync as jest.Mock)
    .mockReturnValueOnce(someFiles)
    .mockReturnValueOnce(someNestedFiles);
  (fs.statSync as jest.Mock)
    .mockReturnValueOnce({ isDirectory: () => false })
    .mockReturnValueOnce({ isDirectory: () => false })
    .mockReturnValueOnce({ isDirectory: () => false })
    .mockReturnValueOnce({ isDirectory: () => false })
    .mockReturnValueOnce({ isDirectory: () => true })
    .mockReturnValue({ isDirectory: () => false });
};
