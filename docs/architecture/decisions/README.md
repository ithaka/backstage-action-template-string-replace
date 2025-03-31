# Architecture decision records

For a primer on architecture decision records (ADRs), see [ADR 0001](0001-record-architecture-decisions.md).

## Updating the decision record

This project uses [adr-tools](https://github.com/npryce/adr-tools), which you can install via Homebrew.

### Creating a new record

The following command will create a new numbered ADR file and open it in your text editor so you can fill out the template:

```shell
$ adr new "Use New Process to solve Big Problem"
```

If a new ADR is meant to negate an older one, use the `-s` to indicate that the older ADR is superseded. As an example, the following command creates a new ADR that supersedes ADR 5:

```shell
$ adr new -s 5 "Use Better Technology to solve Big Problem"
```

### Updating the table of contents

When ADRs are added or changed, you will need to update the table of contents so the links are up to date:

```shell
$ adr generate toc > docs/architecture/decisions/index.md
```

### Viewing the flow of decisions

adr-tools provides a way to generate a graph, which can be useful in understanding the flow of decisions and their history. If you have graphviz and imgcat installed, the following command will display the graph in your terminal:

```shell
$ adr generate graph | dot -Tpng | imgcat
```

If you want to save an image, you can output it to a file instead:

```shell
$ adr generate graph | dot -Tpng > adrs.png
```
