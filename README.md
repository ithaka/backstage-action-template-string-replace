# backstage-action-template-string-replace

A custom Backstage scaffolder action to perform string replacements in files.
This action is useful for templating and customizing files during the scaffolding process where the normal nunjucks templating delimiters prevent you from using some tooling in your project.

## Usage

To use this action, copy this code into your Backstage instance and register it as a custom action. (See the [writing custom actions](https://backstage.io/docs/features/software-templates/writing-custom-actions/) documentation)

Once it is registered, you can use it in your templates. You will need to specify the `replacementStrings` input, which is a map of strings to replace. Each entry in the map should have a `searchTerm` and a `replacementTerm`. The action will search for the `searchTerm` in the files and replace it with the `replacementTerm`.

The action also supports replacing file names. To do this, you can specify a `searchTerm` and a `replacementTerm` for the file name. The action will rename the file if it finds the `searchTerm` in the file name. This will overwrite the file name if it already exists.

Here is an example of how to use the action in a template:

```yaml
- id: replace-template-strings
      name: Replace template string values
      action: ithaka:template-string-replace
      input:
        replacementStrings
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

The action works by replacing content in the context of the current template workspace. The easiest way to populate the context is to read in a remote repository, which you can use the `fetch:template` action:

```yaml
 - id: fetch-template-repository
      name: Fetch Base
      action: fetch:template
      input:
        url: https://github.com/<some-template-repo></some-template-repo>/tree/main
```
