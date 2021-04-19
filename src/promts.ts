import { prompt } from 'inquirer';

export const basicConfiguration: any = async () => {
  const response = await prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your React project? (lower case only)',
      required: true,
      validate: (answer) =>
        answer === answer.toLowerCase() && answer.length > 0,
    },
    {
      type: 'list',
      name: 'programmingLanguage',
      message:
        'Please select the language you would like to use in your React project: ',
      choices: ['Javascript', 'Typescript'],
    },
  ]);

  return response;
};

export const reduxConfiguration: any = async () => {
  const response = await prompt([
    {
      type: 'list',
      name: 'reduxType',
      message: 'Would you like to include Redux for state handling?',
      choices: ['No', 'Redux', 'Redux Toolkit'],
    },
    {
      type: 'input',
      name: 'reduxVersion',
      message: (answers) =>
        `Which version of ${answers.reduxType} would you like?  `,
      when: (answers) => answers.reduxType !== 'No',
      default: 'latest',
      validate: (answer) =>
        (answer.split('.').length === 3 && !answer.split('.').includes(' ')) ||
        answer === 'latest',
    },
  ]);

  return response;
};

export const lintingFormattingConfiguration: any = async () => {
  const response = await prompt([
    {
      type: 'list',
      name: 'lintingFormatting',
      message: 'Please select option for linting and formatting:',
      choices: ['Eslint + Prettier', 'Eslint', 'Prettier', 'None'],
    },
    {
      type: 'list',
      name: 'eslintStyleGuide',
      message: 'Please select a style guide for Eslint: ',
      choices: ['standard', 'airbnb', 'google'],
      when: (answers) => answers.lintingFormatting.includes('Eslint'),
    },
    {
      type: 'confirm',
      name: 'husky',
      message:
        'Would you like to include pre-commits (husky.js) to your project?',
      when: (answers) => answers.lingingFormatting !== 'None',
    },
  ]);

  return response;
};

export const stylingConfiguration: any = async () => {
  const response = await prompt([
    {
      type: 'confirm',
      name: 'includeStyledComponents',
      message: 'Would you like to include styled-components to your project?',
    },
    {
      type: 'input',
      name: 'styledComponentsVersion',
      message: 'Which version of styledComponents would you like?:  ',
      when: (answers) => answers.includeStyledComponents,
      default: 'latest',
      validate: (answer) =>
        (answer.split('.').length === 3 && !answer.split('.').includes(' ')) ||
        answer === 'latest',
    },
  ]);

  return response;
};

export const documentationConfiguration: any = async () => {
  const response = await prompt([
    {
      type: 'confirm',
      name: 'includeDocumentation',
      message:
        'Would you like to include React DOC Generator for generating documentation to your project?',
    },
  ]);

  return response;
};
