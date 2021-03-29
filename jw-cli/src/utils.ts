const exec = require('child_process').exec;
const fs = require('fs');
const yaml = require('js-yaml')
const configPath = require('path');


export const executeShellCommand = async (cmd: string, path: string) => {
  return new Promise((resolve, reject) => {
    if (path !== '') {
      const execution = exec(cmd, { cwd: path }, (error: Error, stdout: any, stderr: any) => {

        if (error) {
          reject(new Error(`exec error: ${error.message}`));
        }

        resolve(stdout ? stdout : stderr);
      });

      execution.stdout.pipe(process.stdout)
    }
  });
}

export const editJsonFile = async (jsonPath: string, sources: string[], keys: string[]) => {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i]
    const configTemplatePath = configPath.resolve(__dirname, source)

    const configData = await fs.readFileSync(configTemplatePath, 'utf-8')
    const jsonData = await fs.readFileSync(jsonPath, 'utf-8')

    let parsedJSON = JSON.parse(jsonData)
    parsedJSON[keys[i]] = JSON.parse(configData)

    await fs.writeFileSync(jsonPath, JSON.stringify(parsedJSON))
  }
}

export const copyProjectConfigFile = async (sourceFile: string, destinationPath: string) => {

  const configTemplatePath = configPath.resolve(__dirname, sourceFile)

  fs.copyFile(configTemplatePath, destinationPath, (err: any) => {
    if (err) throw err;
  })
}

export const generateEslintConfig = (configFile: string, templateFile: string, prettier: boolean, styleGuide: string) => {
  let template = readYamlFile(templateFile)

  let data: any = template
  let extendsField: string[] = data.extends

  extendsField = [styleGuide, ...extendsField]
  prettier && extendsField.push('plugin:prettier/recommended')

  data.extends = extendsField

  createYamlFile(configFile, data)
}


const createYamlFile = (destinationFile: string, data: {}) => {

  const yamlString = yaml.dump(data)
  fs.writeFileSync(destinationFile, yamlString, 'utf8')
}

const readYamlFile = (file: string) => {
  try {
    const data = fs.readFileSync(file, 'utf8')
    let yamlData = yaml.loadAll(data)[0]

    return yamlData

  } catch (e) {
    console.log(e)
  }
}
