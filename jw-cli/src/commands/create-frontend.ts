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

  // static flags = {
  //   help: flags.help({ char: 'h' }),
  //   // flag with a value (-n, --name=VALUE)
  //   name: flags.string({ char: 'n', description: 'name to print' }),
  //   // flag with no value (-f, --force)
  //   force: flags.boolean({ char: 'f' }),
  // }

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
        name: 'project-name',
        message: 'What is the name of your project?',
        required: true,
      },

      {
        type: 'confirm',
        name: 'includeRedux',
        message: 'Do you want to include Redux for state handling?',
        required: true,
        default: true,
      },

    ])

    let languageCommand: string = responses['language'] === 'Typescript' ? `npx create-react-app  ${responses['project-name']} --template typescript` : `npx create-react-app ${responses['project-name']}`;

    let reduxCommand: string = responses['includeRedux'] ? `npm install react-redux` : '';

    console.log(await executeShellCommand(languageCommand, process.cwd()));
    console.log(await executeShellCommand(reduxCommand, `${process.cwd()}/${responses['project-name']}`));
   
    

    
    // executeShellCommand(languageCommand, process.cwd())
    //   .then(async (res1: any) => {
    //     console.log(res1)
    //     executeShellCommand(reduxCommand, `${process.cwd()}/${responses['project-name']}`)
    //       .then(async (res2: any) => {
    //         console.log(res2)
    //       })
    //       .catch((err: any) => {
    //         console.log(err.message)
    //       })
    //   })
    //   .catch((err: any) => {
    //     console.log(err.message)
    //   })
  }
}