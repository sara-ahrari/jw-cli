jw-cli
======

A CLI to create new project tempelates 

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
$ npm install -g jw-cli-poc
$ project-starterkit COMMAND
running command...
$ project-starterkit (-v|--version|version)
jw-cli-poc/1.0.1 win32-x64 node-v14.16.0
$ project-starterkit --help [COMMAND]
USAGE
  $ project-starterkit COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`project-starterkit create-frontend`](#project-starterkit-create-frontend)
* [`project-starterkit help [COMMAND]`](#project-starterkit-help-command)

## `project-starterkit create-frontend`

This command helps you to bootstrap a React project with state managment, formatting, linting and git hooks

```
USAGE
  $ project-starterkit create-frontend

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/create-frontend.ts](https://github.com/sara-ahrari/jw-cli/blob/v1.0.1/src/commands/create-frontend.ts)_

## `project-starterkit help [COMMAND]`

display help for project-starterkit

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
