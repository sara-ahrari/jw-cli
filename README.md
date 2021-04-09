jw-project-template-cli 
======

A CLI to create new project templates 

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/jw-cli.svg)](https://npmjs.org/package/jw-cli)
[![Downloads/week](https://img.shields.io/npm/dw/jw-cli.svg)](https://npmjs.org/package/jw-cli)
[![License](https://img.shields.io/npm/l/jw-cli.svg)](https://github.com/SaraAhrari/Jw-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npx jw-project-template-cli create-frontend
running command...
$ npx project-starterkit (-v|--version|version)
jw-project-template-cli/1.0.0 win32-x64 node-v14.16.0
$ npx project-starterkit --help [COMMAND]
```

or

```sh-session
$ npm install -g jw-project-template-cli
$ project-starterkit COMMAND
running command...
$ project-starterkit (-v|--version|version)
jw-project-template-cli/1.0.0 win32-x64 node-v14.16.0
$ project-starterkit --help [COMMAND]
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`project-starterkit create-frontend`](#project-starterkit-create-frontend)
* [`project-starterkit help [COMMAND]`](#project-starterkit-help-command)

## `project-starterkit create-frontend`

This command sets up a new react project based on your input.

```
USAGE
  $ project-starterkit create-frontend

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/create-frontend.ts](https://github.com/sara-ahrari/jw-cli/blob/v1.0.0/src/commands/create-frontend.ts)_

## `project-starterkit help [COMMAND]`

This commands displays help for a specified COMMAND. 

```
USAGE
  $ project-starterkit help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
