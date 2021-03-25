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
    let includeLinting: boolean;
    let includeFormatting: boolean;
    let lintingStyle: string = '';
    let includeGitHooks: boolean;
    let reactCommand: string = ''

    //First round of questions
    let responses: any = await prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your React project?',
        required: true,
      },
      {
        type: 'list',
        name: 'programmingLanguage',
        message: 'Please select the language you would like to use in your React project: ',
        required: true,
        choices: ['Javascript', 'Typescript'],
      },
      {
        type: 'list',
        name: 'reduxType',
        message: 'Would you like to include Redux for state handling?',
        required: true,
        choices: ['No', 'Redux', 'Redux Toolkit'],
      }
    ])

    //Saving inputs from first round of prompts
    projectName = responses.projectName;
    programmingLanguage = responses.programmingLanguage;
    reduxType = responses.reduxType;

    //If user wants to include redux, prompt the following and determine version
    if (reduxType !== 'No') reduxVersion = await versionInputMethod(reduxType)

    includeStyledComponents = await includeTech('styled-components')
    if (includeStyledComponents) styledComponentsVersion = await versionInputMethod('styled-components')

    responses = await prompt([{
      type: 'list',
      name: 'lintingOrFormatting',
      message: 'Please select option for linting and formatting: ',
      choices: ['Eslint + Prettier', 'Eslint', 'Prettier', 'None']
    }])

    let lintingOrFormatting: string = responses.lintingOrFormatting.split(' + ')

    includeLinting = lintingOrFormatting.includes('Eslint')
    includeFormatting = lintingOrFormatting.includes('Prettier')

    if (includeLinting) {
      responses = await prompt([{
        type: 'list',
        name: 'eslintStyleGuide',
        message: 'Please select a style guide for Eslint: ',
        choices: ['standard', 'airbnb', 'google']
      }])

      lintingStyle = responses.eslintStyleGuide
    }


    includeGitHooks = includeLinting || includeFormatting ? await includeTech('pre-commit hooks (Husky.js)') : false

    //Important paths
    const projectPath: string = process.cwd();
    const insideProjectPath: string = `${process.cwd()}/${projectName}`;
    let installCommand: string = ''

    //Determine create-react-app command 
    switch (reduxType) {
      case 'Redux': {
        reactCommand = programmingLanguage === 'Typescript' ? `npx create-react-app ${projectName} --template typescript` : `npx create-react-app ${projectName}`;
        installCommand = `npm install react-redux${reduxVersion}`
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
    await executeShellCommand(reactCommand, projectPath)

    installCommand !== '' && await executeShellCommand(installCommand, insideProjectPath)

    if (includeStyledComponents) {
      installCommand = `npm install --save styled-components${styledComponentsVersion}`;
      await executeShellCommand(installCommand, insideProjectPath)
    }

   

    const lintingStyleDict: {[key: string]: (param: boolean) => void;} = {
      standard: standardSetup,
      airbnb: airbnbSetup,
      google: googleSetup
    }

    if(includeLinting){
      lintingStyleDict[lintingStyle](includeFormatting);
    } else {
      if(includeFormatting){
        prettierSetupOnly();
      }
    }

    if (includeGitHooks) {
      installCommand = `npm install --save-dev lint-staged husky@4.3.8 prettier`;
      await executeShellCommand(installCommand, insideProjectPath)

      const touchCommand: string = `touch .prettierignore .prettierrc`;
      await executeShellCommand(touchCommand, insideProjectPath)

      await editJsonFile(`${insideProjectPath}/package.json`, ["husky", "lint-staged"]);
    }
  }
}

// --- HELPER METHODS ---
//Helper method for getting versions for various technologies
const standardSetup = (formatting: boolean) => {
  //Function for setting up eslint standard + prettier
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

const prettierSetupOnly = () => {
  //Function for setting up prettier only
  console.log('Setting up Prettier only')
}

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
