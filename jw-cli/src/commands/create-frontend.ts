import { Command, flags } from '@oclif/command'
import { prompt } from 'inquirer'
const exec = require('child_process').exec;
const ora = require('ora');
import { executeShellCommand, editJsonFile } from '../utils';

export default class CreateFrontend extends Command {
  static description = 'This command sets up a project with your preferred packages and stuff'

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

    //All variables
    let projectName: string;
    let programmingLanguage: string;
    let reduxType: string;
    let reduxVersion: string = '';
    let includeStyledComponents: boolean;
    let styledComponentsVersion: string = '';
    let includeGitHooks: boolean;
    let huskyVersion: string = '';
    let reactCommand: string = ''
    let installDependencyCommands: string[] = []


    //First round of questions
    let prompts1: any = await prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        required: true,
      },
      {
        type: 'list',
        name: 'programmingLanguage',
        message: 'Please select the language you want to use in your React project:',
        required: true,
        choices: ['Javascript', 'Typescript'],
      },
      {
        type: 'list',
        name: 'reduxType',
        message: 'Do you want to include Redux for state handling?',
        required: true,
        choices: ['No', 'Redux', 'Redux Toolkit'],
      },
      {
        type: 'list',
        name: 'linter',
        message: 'Do you want to include linter?',
        required: true,
        choices: ['No', 'eslint+prettier', 'eslint+airbnb', 'eslint+standard'],
      }
    ])

    //Saving inputs from first round of prompts
    projectName = prompts1.projectName;
    programmingLanguage = prompts1.programmingLanguage;
    reduxType = prompts1.reduxType;

    //If user wants to include redux, prompt the following and determine version
    if (reduxType !== 'No') reduxVersion = await versionInputMethod(reduxType)

    includeStyledComponents = await includeTech('styled-components')
    if (includeStyledComponents) styledComponentsVersion = await versionInputMethod('styled-components')

    includeGitHooks = await includeTech('Husky for git hooks')

    //Important paths
    const projectPath: string = process.cwd();
    const insideProjectPath: string = `${process.cwd()}/${projectName}`;

    //Determine create-react-app command 
    switch (reduxType) {
      case 'Redux': {
        reactCommand = programmingLanguage === 'Typescript' ? `npx create-react-app ${projectName} --template typescript` : `npx create-react-app ${projectName}`;
        installDependencyCommands.push(`npm install react-redux${reduxVersion}`);
        break;
      }

      case 'Redux Toolkit': {
        reactCommand = programmingLanguage === 'Typescript' ? `npx create-react-app ${projectName} --template redux-typescript${reduxVersion}` : `npx create-react-app ${projectName} --template redux${reduxVersion}`;
        break;
      }

      case 'No': {
        reactCommand = programmingLanguage === 'Typescript' ? `npx create-react-app ${projectName} --template typescript` : `npx create-react-app ${projectName}`;
        break;
      }
      default: break;
    }

    //Run create-react-app with config
    console.log(await executeShellCommand(reactCommand, projectPath));

    if (includeStyledComponents) {
      let command: string =`npm install --save styled-components${styledComponentsVersion}`;
      installDependencyCommands.push(command);
    }

    if (includeGitHooks) {
      let command: string = `npm install --save-dev lint-staged husky@4.3.8 prettier`;
      installDependencyCommands.push(command);
      command = `touch .prettierignore .prettierrc`;
      installDependencyCommands.push(command);
      
        await editJsonFile(`${insideProjectPath}/package.json`, ["husky", "lint-staged"]);
    }

    //Install all dependencies
    installDependencyCommands.forEach(async command => {
      console.log(await executeShellCommand(command, insideProjectPath))
    })
 }
}

// --- HELPER METHODS ---
//Helper method for getting versions for various technologies
const versionInputMethod = async (technology: string) => {
  let input: any = await prompt([
    {
      type: 'input',
      name: 'version',
      message: `What version of ${technology} would you like? (Leave blank for latest version)`
    }
  ])

  let res = input.version === '' ? '' : `@${input.version}`
  return res
}

//Helper method for checking if user wants to include a specific technology
const includeTech = async (technology: string) => {
  let input: any = await prompt([
    {
      type: 'confirm',
      name: 'include',
      message: `Would you like to include ${technology} in your project?`,
      default: true
    }
  ])
  return input.include;
}
