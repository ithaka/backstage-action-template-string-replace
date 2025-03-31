import { createTemplateStringReplaceAction } from "./createTemplateStringReplaceAction";
import fs from "fs-extra";
import { setupFileMocks } from "./testUtils/setupFileMocks";

jest.mock("fs-extra");
const somePath = "/mock/path";

describe("createTemplateStringReplaceAction", () => {
  let handler: any;

  // Mock Backstage context the action will be ran against
  const testContext = {
    logger: {
      info: jest.fn(),
    },
    logStream: {
      write: jest.fn(),
    },
    output: jest.fn(),
    workspacePath: somePath,
    input: {
      replacementStrings: {
        name: {
          searchTerm: "testInput",
          replacementTerm: "testOutput",
        },
      },
    },
  };

  beforeEach(() => {
    handler = createTemplateStringReplaceAction().handler;
    setupFileMocks();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("replaces the replacementStrings in the file content", async () => {
    (fs.readFileSync as jest.Mock)
      .mockReturnValueOnce("This is some testInput file content")
      .mockReturnValue("This is some file content");
    handler(testContext);
    expect(fs.writeFileSync as jest.Mock).toHaveBeenNthCalledWith(
      1,
      `${somePath}/testOutput.txt`,
      "This is some testOutput file content",
    );
  });

  it("replaces the replacementStrings in the file names", async () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("This is some file content");

    handler(testContext);
    expect(fs.renameSync as jest.Mock).toHaveBeenNthCalledWith(
      1,
      `${somePath}/testInput.txt`,
      `${somePath}/testOutput.txt`,
    );
  });
});
