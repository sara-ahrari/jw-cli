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
$ npm install -g jw-cli
$ project-starterkit COMMAND
running command...
$ project-starterkit (-v|--version|version)
jw-cli/0.0.0 win32-x64 node-v15.7.0
$ project-starterkit --help [COMMAND]
USAGE
  $ project-starterkit COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`project-starterkit hello [FILE]`](#project-starterkit-hello-file)
* [`project-starterkit help [COMMAND]`](#project-starterkit-help-command)

## `project-starterkit hello [FILE]`

describe the command here

```
USAGE
  $ project-starterkit hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ project-starterkit hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/SaraAhrari/Jw-cli/blob/v0.0.0/src/commands/hello.ts)_

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
