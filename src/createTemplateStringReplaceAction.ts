import {
  createTemplateAction,
  TemplateAction,
} from "@backstage/plugin-scaffolder-node";
import fs from "fs-extra";
import { JsonObject } from "@backstage/types";
import { getAllTemplateFiles } from "./getAllTemplateFiles";

/**
 * Creates an  action for the Backstage scaffolder plugin which handles custom string replacements in templates.
 *
 * @returns A template action that can be used by the Backstage scaffolder.
 */
export const createTemplateStringReplaceAction: () => TemplateAction<
  JsonObject,
  JsonObject
> = () => {
  return createTemplateAction({
    id: "ithaka:template-string-replace",
    description:
      "An action to replace strings in all files in the template with the provided alternatives",
    schema: {},
    async handler(ctx) {
      const stripWorkspacePath = (path: string) => {
        return path.replace(ctx.workspacePath, "");
      };

      const stringReplacements = ctx.input.replacementStrings as {
        [key: string]: { searchTerm: string; replacementTerm: string };
      };

      ctx.logger.info("---------------------------------------------");
      ctx.logger.info("Template String Replacements received:");
      for (const replacement in stringReplacements) {
        ctx.logger.info(
          `${stringReplacements[replacement].searchTerm} => ${stringReplacements[replacement].replacementTerm}`,
        );
      }
      ctx.logger.info("---------------------------------------------");
      ctx.logger.info("Processing Replacements...");

      const filePaths = getAllTemplateFiles(ctx.workspacePath);
      filePaths.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath).toString();
        let replacementContent = fileContent;
        let replacementFileName = filePath;
        for (const replacement in stringReplacements) {
          replacementFileName = replacementFileName.replaceAll(
            stringReplacements[replacement].searchTerm,
            stringReplacements[replacement].replacementTerm,
          );
          replacementContent = replacementContent.replaceAll(
            stringReplacements[replacement].searchTerm,
            stringReplacements[replacement].replacementTerm,
          );
        }

        if (replacementFileName !== filePath) {
          ctx.logger.info(
            `Renaming ${stripWorkspacePath(filePath)} to ${stripWorkspacePath(
              replacementFileName,
            )}`,
          );
          fs.renameSync(filePath, replacementFileName);
        }

        if (replacementContent != fileContent) {
          ctx.logger.info(
            `Replacing ${stripWorkspacePath(
              replacementFileName,
            )} with new content`,
          );
          fs.writeFileSync(replacementFileName, replacementContent);
        }
      });
    },
  });
};
