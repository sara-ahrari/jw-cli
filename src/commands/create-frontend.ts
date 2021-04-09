import { Command, flags } from '@oclif/command';
import {
  executeShellCommand,
  editJsonFile,
  copyProjectConfigFile,
  generateEslintConfig,
} from '../utils';
import * as prompts from '../promts';

export default class CreateFrontend extends Command {
  static description =
    'This command sets up a project with your preferred packages and stuff';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  run = async (): Promise<void> => {
    const basicConfig: any = await prompts.basicConfiguration();
    const projectName: string = basicConfig.projectName;
    const programmingLanguage: string = basicConfig.programmingLanguage;
    const langString: string =
      programmingLanguage === 'Javascript' ? 'JS' : 'TS';

    const reduxConfig: any = await prompts.reduxConfiguration();
    const reduxType: string = reduxConfig.reduxType;
    const reduxVersion: string = reduxConfig.reduxVersion;

    const lintingConfig: any = await prompts.lintingFormattingConfiguration();
    const includeLinting: boolean = lintingConfig.lintingFormatting.includes(
      'Eslint'
    );
    const includeFormatting: boolean = lintingConfig.lintingFormatting.includes(
      'Prettier'
    );
    const lintingStyle: string = lintingConfig.eslintStyleGuide;
    const includeGitHooks: boolean = lintingConfig.husky;

    const styledComponentsConfig: any = await prompts.stylingConfiguration();
    const includeStyledComponents: boolean =
      styledComponentsConfig.includeStyledComponents;
    const styledComponentsVersion: string =
      styledComponentsConfig.styledComponentsVersion;

    const documentationConfig: any = await prompts.documentationConfiguration();
    const includeDocumentation: boolean =
      documentationConfig.includeDocumentation;

    /* Important paths */
    const projectPath: string = process.cwd();
    const insideProjectPath = `${process.cwd()}/${projectName}`;

    /* Determine create-react-app command */
    let installReduxCommand = '';
    let reactCommand = '';

    switch (reduxType) {
      case 'Redux': {
        reactCommand =
          programmingLanguage === 'Typescript'
            ? `npx create-react-app ${projectName} --template typescript`
            : `npx create-react-app ${projectName}`;
        installReduxCommand = `npm install react-redux@${reduxVersion}`;
        break;
      }

      case 'Redux Toolkit': {
        reactCommand =
          programmingLanguage === 'Typescript'
            ? `npx create-react-app ${projectName} --template redux-typescript@${reduxVersion}`
            : `npx create-react-app ${projectName} --template redux@${reduxVersion}`;
        break;
      }

      case 'No': {
        reactCommand =
          programmingLanguage === 'Typescript'
            ? `npx create-react-app ${projectName} --template typescript`
            : `npx create-react-app ${projectName}`;
        break;
      }
      default:
        break;
    }

    /* Run create-react-app with config */
    await executeShellCommand(reactCommand, projectPath);

    installReduxCommand !== '' &&
      (await executeShellCommand(installReduxCommand, insideProjectPath));

    if (includeStyledComponents) {
      const cmd = `npm install --save styled-components@${styledComponentsVersion}`;
      await executeShellCommand(cmd, insideProjectPath);
    }

    if (includeDocumentation) {
      const cmd = 'npm install -save-dev react-doc-generator';
      await executeShellCommand(cmd, insideProjectPath);
    }

    // --- HELPER METHODS ---
    const initiateHooks = async (configLintStaged: string): Promise<void> => {
      const cmd = `npm install --save-dev lint-staged husky@4.3.8`;
      await executeShellCommand(cmd, insideProjectPath);
      await editJsonFile(
        `${insideProjectPath}/package.json`,
        ['husky', configLintStaged],
        ['husky', 'lint-staged']
      );
    };

    const setupPrettier = async (): Promise<void> => {
      const npmCmd = 'npm install --save-dev prettier';
      await executeShellCommand(npmCmd, insideProjectPath);
      await copyProjectConfigFile(
        '.prettierrc.yaml',
        `${insideProjectPath}/.prettierrc.yaml`
      );
      await copyProjectConfigFile(
        '.prettierignore',
        `${insideProjectPath}/.prettierignore`
      );

      if (includeGitHooks) {
        if (includeLinting) {
          await initiateHooks('lint-staged-eslint');
        } else {
          await initiateHooks('lint-staged-prettier');
        }
      }
    };

    const setupEslint = async (cmd: string): Promise<void> => {
      await executeShellCommand(cmd, insideProjectPath);
      programmingLanguage === 'Typescript' &&
        (await executeShellCommand(
          'npm install --save-dev eslint-plugin-react eslint-config-airbnb-typescript',
          insideProjectPath
        ));

      const alteredLintingStyle =
        lintingStyle === 'airbnb' && programmingLanguage === 'Typescript'
          ? 'airbnb-typescript'
          : lintingStyle;

      if (includeFormatting) {
        await setupPrettier();
        await generateEslintConfig(
          `${insideProjectPath}/.eslintrc.yaml`,
          `eslintTemplate${langString}.yaml`,
          true,
          alteredLintingStyle
        );
      } else {
        await generateEslintConfig(
          `${insideProjectPath}/.eslintrc.yaml`,
          `eslintTemplate${langString}.yaml`,
          false,
          alteredLintingStyle
        );
      }
    };

    // --- SETUP METHODS ---

    const standardSetup = async (): Promise<void> => {
      const cmd = includeFormatting
        ? 'npm install --save-dev eslint-plugin-prettier prettier eslint-config-prettier eslint-config-standard eslint-plugin-node eslint-plugin-promise'
        : 'npm install --save-dev eslint-config-standard eslint-plugin-node eslint-plugin-promise';
      await setupEslint(cmd);
    };

    const airbnbSetup = async (): Promise<void> => {
      const cmd = includeFormatting
        ? 'npm install --save-dev eslint-plugin-prettier prettier eslint-config-prettier eslint-config-airbnb'
        : `npm install --save-dev eslint-config-airbnb`;
      await setupEslint(cmd);
    };

    const googleSetup = async (): Promise<void> => {
      const cmd = includeFormatting
        ? 'npm install --save-dev eslint-plugin-prettier prettier eslint-config-prettier eslint-config-google'
        : 'npm install --save-dev eslint-config-google';
      await setupEslint(cmd);
    };

    const lintingStyleDict: { [key: string]: () => Promise<void> } = {
      standard: standardSetup,
      airbnb: airbnbSetup,
      google: googleSetup,
    };

    if (includeLinting) {
      await lintingStyleDict[lintingStyle]();
    } else if (includeFormatting) {
      await setupPrettier();
    }
  };
}
