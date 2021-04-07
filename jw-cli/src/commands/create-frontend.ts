import { Command, flags } from '@oclif/command'
import { prompt } from 'inquirer'
import { executeShellCommand, editJsonFile, copyProjectConfigFile, generateEslintConfig } from '../utils';

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
    /*First round of questions*/
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

    const projectName: string = basicConfiguration.projectName
    const programmingLanguage: string = basicConfiguration.programmingLanguage

    /*Questions for including redux*/
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
        message: (answers) => `Which version of ${answers.reduxType} would you like?  `,
        when: (answers) => answers.reduxType !== 'No',
        default: 'latest',
        validate: (answer) => (answer.split('.').length === 3 && !answer.split('.').includes(' ')) || answer === 'latest'
      }
    ])

    const reduxType: string = reduxConfiguration.reduxType
    const reduxVersion: string = reduxConfiguration.reduxVersion


    /* Questions for including linting*/
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

    const includeLinting: boolean = lintingFormattingConfiguration.lintingFormatting.includes('Eslint')
    const includeFormatting: boolean = lintingFormattingConfiguration.lintingFormatting.includes('Prettier')
    const lintingStyle: string = lintingFormattingConfiguration.eslintStyleGuide
    const includeGitHooks: boolean = lintingFormattingConfiguration.husky

    /*Question to include styled components*/
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

    const includeStyledComponents: boolean = stylingConfiguration.includeStyledComponents
    const styledComponentsVersion: string = stylingConfiguration.styledComponentsVersion

    /* Question for including documentation*/
    const documentConfiguration: any = await prompt([
      {
        type: 'confirm',
        name: 'includeDocumentation',
        message: 'Would you like to include React DOC Generator to your project(It generates simple React components documentation in Markdown)?'
      },
    ])
    const includeDocumentation: boolean = documentConfiguration.includeDocumentation;


    /*Important paths*/
    const projectPath: string = process.cwd();
    const insideProjectPath: string = `${process.cwd()}/${projectName}`;


    /*Determine create-react-app command*/
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

    /*Run create-react-app with config*/
    await executeShellCommand(reactCommand, projectPath)

    installReduxCommand !== '' && await executeShellCommand(installReduxCommand, insideProjectPath)

    if (includeStyledComponents) {
      const cmd = `npm install --save styled-components@${styledComponentsVersion}`;
      await executeShellCommand(cmd, insideProjectPath)
    }

    if (includeDocumentation) {
      const cmd = 'npm install -save-dev react-doc-generator';
      await executeShellCommand(cmd, insideProjectPath)
    }

    const lintingStyleDict: { [key: string]: (param1: boolean, param2: boolean, param3: string, param4: string) => Promise<void>; } = {
      standard: standardSetup,
      airbnb: airbnbSetup,
      google: googleSetup
    }

    if (includeLinting) {
      lintingStyleDict[lintingStyle](includeGitHooks, includeFormatting, insideProjectPath, programmingLanguage);
    } else {
      if (includeFormatting) {
        prettierSetupOnly(includeGitHooks, insideProjectPath);
      }
    }
  }
}

// --- SETUP METHODS ---

const standardSetup = async (includeHooks: boolean, formatting: boolean, dirPath: string, language: string) => {
  if (formatting) {
    const npmCmd = 'npm install --save-dev eslint-plugin-prettier prettier eslint-config-prettier eslint-config-standard eslint-plugin-node eslint-plugin-promise';
    setUpEslintHelperFormatting(includeHooks, dirPath, language, npmCmd, 'standard');

  } else {
    const npmCmd = 'npm install --save-dev eslint-config-standard eslint-plugin-node eslint-plugin-promise'
    setUpEslintHelperNoFormatting(includeHooks, dirPath, language, npmCmd, 'standard');
  }
}
const airbnbSetup = async (includeHooks: boolean, formatting: boolean, dirPath: string, language: string) => {
  if (formatting) {
    const npmCmd = 'npm install --save-dev eslint-plugin-prettier prettier eslint-config-prettier eslint-config-airbnb'
    setUpEslintHelperFormatting(includeHooks, dirPath, language, npmCmd, 'airbnb');

  } else {
    const npmCmd = `npm install --save-dev eslint-config-airbnb`
    setUpEslintHelperNoFormatting(includeHooks, dirPath, language, npmCmd, 'airbnb');
  }
}

const googleSetup = async (includeHooks: boolean, formatting: boolean, dirPath: string, language: string) => {
  if (formatting) {
    const npmCmd = 'npm install --save-dev eslint-plugin-prettier prettier eslint-config-prettier eslint-config-google'
    setUpEslintHelperFormatting(includeHooks, dirPath, language, npmCmd, 'google');

  } else {
    const npmCmd = 'npm install --save-dev eslint-config-google'
    setUpEslintHelperNoFormatting(includeHooks, dirPath, language, npmCmd, 'google');
  }
}

//--- HELPER METHODS ---

const setUpEslintHelperFormatting = async (includeHooks: boolean, dirPath: string, language: string, initialCmd: string, configType: string) => {
  await executeShellCommand(initialCmd, dirPath)
  language === 'Typescript' && await executeShellCommand('npm install --save-dev eslint-plugin-react eslint-config-airbnb-typescript', dirPath)

  let lintingStyle = language === 'Typescript' && configType === 'airbnb' ? 'airbnb-typescript' : configType
  await initPrettier(includeHooks, dirPath, './configs/lint-staged-eslint')

  let langString: string = language === 'Javascript' ? 'JS' : 'TS'
  await generateEslintConfig(`${dirPath}/.eslintrc.yaml`, `./configs/eslintTemplate${langString}.yaml`, true, lintingStyle)
}

const setUpEslintHelperNoFormatting = async (includeHooks: boolean, dirPath: string, language: string, initialCmd: string, configType: string) => {
  await executeShellCommand(initialCmd, dirPath)
  language === 'Typescript' && await executeShellCommand('npm install --save-dev eslint-plugin-react', dirPath)
  let lintingStyle = language === 'Typescript' && configType === 'airbnb' ? 'airbnb-typescript' : configType

  includeHooks && await initiateHooks(dirPath, './configs/lint-staged-eslint')

  let langString: string = language === 'Javascript' ? 'JS' : 'TS'
  await generateEslintConfig(`${dirPath}/.eslintrc.yaml`, `./configs/eslintTemplate${langString}.yaml`, false, lintingStyle)
}

const prettierSetupOnly = async (includeHooks: boolean, dirPath: string) => {
  const npmCmd = 'npm install --save-dev prettier'
  await executeShellCommand(npmCmd, dirPath)
  await initPrettier(includeHooks, dirPath, './configs/lint-staged-prettier')
}

const initPrettier = async (includeHooks: boolean, dirPath: string, lintStagedConfig: string) => {
  await copyProjectConfigFile('./configs/.prettierrc.yaml', `${dirPath}/.prettierrc.yaml`)
  await copyProjectConfigFile('./configs/.prettierignore', `${dirPath}/.prettierignore`)

  if (includeHooks) {
    await initiateHooks(dirPath, lintStagedConfig)
  }
}

const initiateHooks = async (dirPath: string, configLintStaged: string) => {
  const cmd = `npm install --save-dev lint-staged husky@4.3.8`;
  await executeShellCommand(cmd, dirPath)

  await editJsonFile(`${dirPath}/package.json`, ['./configs/husky', configLintStaged], ['husky', 'lint-staged']);

}
