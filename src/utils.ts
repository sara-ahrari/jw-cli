const exec = require('child_process').exec;
const fs = require('fs');
const fse = require('fs-extra');
const yaml = require('js-yaml');
const configPath = require('path');

export const executeShellCommand = async (
  cmd: string,
  path: string,
  pipe = true
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (path !== '') {
      const execution = exec(
        cmd,
        { cwd: path },
        (error: Error, stdout: any, stderr: any) => {
          if (error) {
            reject(new Error(`exec error: ${error.message}`));
          }

          resolve(stdout ? stdout : stderr);
        }
      );

      pipe && execution.stdout.pipe(process.stdout);
    }
  });
};

export const createFile = (path: string, data: string): void => {
  fs.writeFileSync(path, data, 'utf8');
};

export const editJsonFile = async (
  jsonPath: string,
  sources: string[],
  keys: string[]
): Promise<void> => {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const packagePath = configPath.dirname(
      require.resolve(
        configPath.join(require('../package.json').name, 'package.json')
      )
    );
    const configTemplatePath = configPath.join(
      packagePath,
      'cliConfigs',
      source
    );

    const configData = fs.readFileSync(configTemplatePath, 'utf-8');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');

    const parsedJSON = JSON.parse(jsonData);
    parsedJSON[keys[i]] = JSON.parse(configData);

    fs.writeFileSync(jsonPath, JSON.stringify(parsedJSON));
  }
};

const createYamlFile = (destinationFile: string, data: any): void => {
  const yamlString = yaml.dump(data);
  fs.writeFileSync(destinationFile, yamlString, 'utf8');
};

const readYamlFile = (file: string): any => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    const yamlData = yaml.loadAll(data)[0];

    return yamlData;
  } catch (error) {
    console.log(error);
  }
};

export const copyProjectConfigFile = async (
  sourceFile: string,
  destinationPath: string
): Promise<void> => {
  const packagePath = configPath.dirname(
    require.resolve(
      configPath.join(require('../package.json').name, 'package.json')
    )
  );

  const configTemplatePath = configPath.join(
    packagePath,
    'cliConfigs',
    sourceFile
  );

  fs.copyFile(configTemplatePath, destinationPath, (err: any) => {
    if (err) throw err;
  });
};

export const copyFolder = (srcDir: string, destDir: string) => {
  const packagePath = configPath.dirname(
    require.resolve(
      configPath.join(require('../package.json').name, 'package.json')
    )
  );

  const srcDirPath = configPath.join(packagePath, 'cliConfigs', srcDir);

  try {
    fse.copySync(srcDirPath, destDir);
  } catch (error) {
    console.log(error.message);
  }
};

export const generateEslintConfig = (
  configFile: string,
  templateFile: string,
  prettier: boolean,
  styleGuide: string
): void => {
  const packagePath = configPath.dirname(
    require.resolve(
      configPath.join(require('../package.json').name, 'package.json')
    )
  );

  const configTemplatePath = configPath.join(
    packagePath,
    'cliConfigs',
    templateFile
  );
  const template = readYamlFile(configTemplatePath);

  const data: any = template;
  const extendsField: string[] = data.extends;

  extendsField.push(styleGuide);
  prettier && extendsField.push('plugin:prettier/recommended');

  data.extends = extendsField;

  createYamlFile(configFile, data);
};
