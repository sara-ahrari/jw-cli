import { Command, flags } from '@oclif/command'
import { prompt } from 'inquirer'
const exec = require('child_process').exec;
const ora = require('ora');
import { executeShellCommand } from '../utils';

export default class CreateFrontend extends Command {
  static description = 'This command set up a project with your preferred packages and stuff'

  // static examples = [
  //   `$ Create Project Tempelate`,
  // ]

  static flags = {
    help: flags.help({ char: 'h' }),
    //   // flag with a value (-n, --name=VALUE)
    //   name: flags.string({ char: 'n', description: 'name to print' }),
    //   // flag with no value (-f, --force)
    //   force: flags.boolean({ char: 'f' }),
  }

  // static args = [{ name: 'file' }]

  async run() {
    let responses: any = await prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Please select the language you want to use in your React project:',
        required: true,
        choices: ['Javascript', 'Typescript'],
      },
      {
        type: 'input',
        name: 'project-name',
        message: 'What is the name of your project?',
        required: true,
      },
      {
        type: 'list',
        name: 'reduxType',
        message: 'Do you want to include Redux?',
        required: true,
        choices: ['No', 'Redux', 'Redux Toolkit'],
      }, 
       {
        type: 'confirm',
        name: 'styledComponents',
        message: 'Do you want to include styled-components?',
        required: true,
        default: true,
      },
    ])
    let command: string = '';
    const projectPath: string = process.cwd();
    const insideProjectPath: string = `${process.cwd()}/${responses['project-name']}`;

    //Setup the project with Redux or Redux toolkit or neither 
    if (responses['reduxType'] === 'Redux') {
      command = responses['language'] === 'Typescript' ? `npx create-react-app ${responses['project-name']} --template typescript` : `npx create-react-app ${responses['project-name']}`;
      console.log(await executeShellCommand(command, projectPath ));
      command = `npm install react-redux`;
      console.log(await executeShellCommand(command, insideProjectPath));
    } else if (responses['reduxType'] === 'Redux Toolkit') {
      command = responses['language'] === 'Typescript' ? `npx create-react-app ${responses['project-name']} --template redux-typescript` : `npx create-react-app ${responses['project-name']} --template redux`;
      console.log(await executeShellCommand(command,  projectPath));
    } else {
      command = responses['language'] === 'Typescript' ? `npx create-react-app ${responses['project-name']} --template typescript` : `npx create-react-app ${responses['project-name']}`;
      console.log(await executeShellCommand(command,  projectPath));
    }

    //Add styled-components 
    command = responses['styledComponents'] ? 'npm install --save styled-components' : '';
    console.log(await executeShellCommand(command, insideProjectPath));

  }
}