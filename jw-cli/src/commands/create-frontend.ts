import { Command, flags } from '@oclif/command'
import { prompt } from 'inquirer'
const exec = require('child_process').exec;
const ora = require('ora');
import { executeShellCommand, editJsonFile, editProjectConfigFile } from '../utils';

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
    let includeLinting: boolean;
    let includeFormatting: boolean;
    let lintingStyle: string = '';
    let includeGitHooks: boolean;

    //First round of questions
    const basicConfiguration: any = await prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your React project? (lower case only)',
        required: true,
        validate: (answer) => answer === answer.toLowerCase()
      },
      {
        type: 'list',
        name: 'programmingLanguage',
        message: 'Please select the language you would like to use in your React project: ',
        choices: ['Javascript', 'Typescript']
      }
    ])

    projectName = basicConfiguration.projectName
    programmingLanguage = basicConfiguration.programmingLanguage

    const reduxConfiguration: any = await prompt([
      {
        type: 'list',
        name: 'reduxType',
        message: 'Would you like to include Redux for state handling?',
        choices: ['No', 'Redux', 'Redux Toolkit'],
      },
      {
        type: 'input',
        name: 'reduxVersion',
        message: (answers) => `Which version of ${answers.reduxType} would you like?:  `,
        when: (answers) => answers.reduxType !== 'No',
        default: 'latest',
        validate: (answer) => (answer.split('.').length === 3 && !answer.split('.').includes(' ')) || answer === 'latest'
      }
    ])

    reduxType = reduxConfiguration.reduxType
    reduxVersion = reduxConfiguration.reduxVersion

    const lintingFormattingConfiguration: any = await prompt([
      {
        type: 'list',
        name: 'lintingFormatting',
        message: 'Please select option for linting and formatting:',
        choices: ['Eslint + Prettier', 'Eslint', 'Prettier', 'None']
      },
      {
        type: 'list',
        name: 'eslintStyleGuide',
        message: 'Please select a style guide for Eslint: ',
        choices: ['standard', 'airbnb', 'google'],
        when: (answers) => answers.lintingFormatting.includes('Eslint')
      },
      {
        type: 'confirm',
        name: 'husky',
        message: 'Would you like to include pre-commits (husky.js) to your project?',
        when: (answers) => answers.lingingFormatting !== 'None'
      }
    ])

    includeLinting = lintingFormattingConfiguration.lintingFormatting.includes('Eslint')
    includeFormatting = lintingFormattingConfiguration.lintingFormatting.includes('Prettier')
    lintingStyle = lintingFormattingConfiguration.eslintStyleGuide
    includeGitHooks = lintingFormattingConfiguration.husky

    const stylingConfiguration: any = await prompt([
      {
        type: 'confirm',
        name: 'includeStyledComponents',
        message: 'Would you like to include styled-components to your project?'
      },
      {
        type: 'input',
        name: 'styledComponentsVersion',
        message: 'Which version of styledComponents would you like?:  ',
        when: (answers) => answers.includeStyledComponents,
        default: 'latest',
        validate: (answer) => (answer.split('.').length === 3 && !answer.split('.').includes(' ')) || answer === 'latest'
      }
    ])

    includeStyledComponents = stylingConfiguration.includeStyledComponents
    styledComponentsVersion = stylingConfiguration.styledComponentsVersion

    //Important paths
    const projectPath: string = process.cwd();
    const insideProjectPath: string = `${process.cwd()}/${projectName}`;


    //Determine create-react-app command 
    let installReduxCommand: string = ''
    let reactCommand: string = ''

    switch (reduxType) {
      case 'Redux': {
        reactCommand = programmingLanguage === 'Typescript' ? `npx create-react-app ${projectName} --template typescript` : `npx create-react-app ${projectName}`;
        installReduxCommand = `npm install react-redux@${reduxVersion}`
        break;
      }

      case 'Redux Toolkit': {
        reactCommand = programmingLanguage === 'Typescript' ? `npx create-react-app ${projectName} --template redux-typescript@${reduxVersion}` : `npx create-react-app ${projectName} --template redux@${reduxVersion}`;
        break;
      }

      case 'No': {
        reactCommand = programmingLanguage === 'Typescript' ? `npx create-react-app ${projectName} --template typescript` : `npx create-react-app ${projectName}`;
        break;
      }
      default: break;
    }

    //Run create-react-app with config
    await executeShellCommand(reactCommand, projectPath)

    installReduxCommand !== '' && await executeShellCommand(installReduxCommand, insideProjectPath)

    if (includeStyledComponents) {
      const cmd = `npm install --save styled-components@${styledComponentsVersion}`;
      await executeShellCommand(cmd, insideProjectPath)
    }

    const lintingStyleDict: { [key: string]: (param: boolean) => void; } = {
      standard: standardSetup,
      airbnb: airbnbSetup,
      google: googleSetup
    }

    if (includeLinting) {
      lintingStyleDict[lintingStyle](includeFormatting);
    } else {
      if (includeFormatting) {
        prettierSetupOnly(includeGitHooks, insideProjectPath);
      }
    }

  }
}

// --- SETUP METHODS ---

const standardSetup = (formatting: boolean) => {
  //Function for setting up eslint standard + prettiero
  formatting ? console.log('Setting up Eslint Standard + Prettier') : console.log('Setting up Eslint Standard')
}

const airbnbSetup = (formatting: boolean) => {
  //Function for setting up eslint airbnb + prettier
  formatting ? console.log('Setting up Eslint Airbnb + Prettier') : console.log('Setting up Eslint Airbnb')
}


const googleSetup = (formatting: boolean) => {
  //Function for setting up eslint google + prettier
  formatting ? console.log('Setting up Eslint Google + Prettier') : console.log('Setting up Eslint Google')
}

const prettierSetupOnly = async (includeHooks: boolean, dirPath: string) => {

  const npmCmd = 'npm install --save-dev prettier'
  await executeShellCommand(npmCmd, dirPath)

  const filesCmd = 'touch .prettierrc.js .prettierignore'
  await executeShellCommand(filesCmd, dirPath)
  await editProjectConfigFile(dirPath, '.prettierrc.js', 'prettierrcConfig')
  await editProjectConfigFile(dirPath, '.prettierignore', 'prettierignoreConfig')

  if (includeHooks) {
    await initiateHooks(dirPath)
  }


  /* 
  1. install prettier 
  2. include .prettierrc.js and .prettierIgnore with default settings 
  3. If includeHooks => initiate husky
  4. add "prettier --write" to lint-staged if includeHooks
  */

}

//--- HELPER METHODS ---
const initiateHooks = async (dirPath: string) => {
  const cmd = `npm install --save-dev lint-staged husky@4.3.8`;
  await executeShellCommand(cmd, dirPath)
  await editJsonFile(`${dirPath}/package.json`, ["husky", "lint-staged"]);
}
