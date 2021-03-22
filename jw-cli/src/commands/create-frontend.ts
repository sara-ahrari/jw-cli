import { Command, flags } from '@oclif/command'
import { prompt } from 'inquirer'
const exec = require('child_process').exec;
const ora = require('ora');
import { executeShellCommand, editJsonFile } from '../utils';

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
    let language: any = await prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Please select the language you want to use in your React project:',
        required: true,
        choices: ['Javascript', 'Typescript'],
      }])

    let projectNameInput: any = await prompt([
      {
        type: 'input',
        name: 'project-name',
        message: 'What is the name of your project?',
        required: true,
      }
    ])

    let reduxType: any = await prompt([
      {
        type: 'list',
        name: 'reduxType',
        message: 'Do you want to include Redux?',
        required: true,
        choices: ['No', 'Redux', 'Redux Toolkit'],
      }
    ])

    let reduxVersion: string = ''

    if (reduxType['reduxType'] !== 'No') {
      let reduxVersionInput: any = await prompt([
        {
          type: 'input',
          name: 'reduxVersion',
          message: `What type of ${reduxType['reduxType']} would you like? (You may skip for the latest version)`
        }
      ])

      reduxVersion = reduxVersionInput['reduxVersion'] === '' ? reduxVersionInput['reduxVersion'] : `@${reduxVersionInput['reduxVersion']}`
    }

    let styledComponents: any = await prompt([
      {
        type: 'confirm',
        name: 'styledComponents',
        message: 'Do you want to include styled-components?',
        required: true,
        default: true,
      }
    ])

    let styledComponentsVersion: string = ''

    if (styledComponents['styledComponents']) {
      let styledComponentsVersionInput: any = await prompt([
        {
          type: 'input',
          name: 'styledComponentsVersion',
          message: 'What version of styled-components would you like? (You may skip for the latest version)'
        }
      ])
      styledComponentsVersion = styledComponentsVersionInput['styledComponentsVersion'] === '' ? '' : `@${styledComponentsVersionInput['styledComponentsVersion']}`
    }

    let gitHooks: any = await prompt([
      {
        type: 'confirm',
        name: 'gitHooks',
        message: 'Would you like to include git hooks in your project with Husky.js?'
      }
    ])

    let huskyVersion: string = ''

    if(gitHooks['gitHooks']){
      let huskyVersionInput: any = await prompt([
        {
          type: 'input',
          name: 'huskyVersionInput',
          message: 'What version of husky would you like? (You may skip for the latest version)'
        }
      ])
      huskyVersion = huskyVersionInput['huskyVersionInput'] === '' ? '' : `@${huskyVersionInput['huskyVersionInput']}`
    }

    const projectName = projectNameInput['project-name']
    let command: string = '';
    const projectPath: string = process.cwd();
    const insideProjectPath: string = `${process.cwd()}/${projectName}`;

    //Setup the project with Redux or Redux toolkit or neither 
    if (reduxType['reduxType'] === 'Redux') {
      command = language['language'] === 'Typescript' ? `npx create-react-app ${projectName} --template typescript` : `npx create-react-app ${projectName}`;
      console.log(await executeShellCommand(command, projectPath));
      command = `npm install react-redux${reduxVersion}`;
      console.log(await executeShellCommand(command, insideProjectPath));
    } else if (reduxType['reduxType'] === 'Redux Toolkit') {
      command = language['language'] === 'Typescript' ? `npx create-react-app ${projectName} --template redux-typescript${reduxVersion}` : `npx create-react-app ${projectName} --template redux${reduxVersion}`;
      console.log(await executeShellCommand(command, projectPath));
    } else {
      command = language['language'] === 'Typescript' ? `npx create-react-app ${projectName} --template typescript` : `npx create-react-app ${projectName}`;
      console.log(await executeShellCommand(command, projectPath));
    }

    if (styledComponents['styledComponents']) {
      command = language['language'] === 'Typescript' ? `npm install --save @types/styled-components${styledComponentsVersion}` : `npm install --save styled-components${styledComponentsVersion}`;
      console.log(await executeShellCommand(command, insideProjectPath));
    }

    if(gitHooks['gitHooks']){
      command = `npm install husky${huskyVersion}`
      await editJsonFile(`${insideProjectPath}/package.json`)
      console.log(await executeShellCommand(command, insideProjectPath));
    }
  }
}