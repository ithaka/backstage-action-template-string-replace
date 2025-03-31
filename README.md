# backstage-action-template-string-replace

A custom Backstage scaffolder action to perform string replacements in files.
This action is useful for templating and customizing files during the scaffolding process where the normal nunjucks templating delimiters prevent you from using some tooling in your project

## Usage

To use this action, coy this code into your Backstage instance and register it as a cusomt action. Then, you can add it to your Backstage template definitions as follows:

```yaml
- id: replace-template-strings
      name: Replace template string values
      action: ithaka:template-string-replace
      input:
        replacementStrings:
		 # You can also replace file content
          name:
            searchTerm: my-template-name
            replacementTerm: ${{ parameters.name }}
          owner:
            searchTerm: replace-with-project-owner
            replacementTerm: ${{ parameters.team }}
          description:
            searchTerm: replace-with-project-description
            replacementTerm: ${{ parameters.description }}
          # You can also replace files by renaming them
          catalogFile:
            searchTerm: project-catalog-info
            replacementTerm: filename-to-replace
          READMEFile:
            searchTerm: project-README
            replacementTerm: README
```
