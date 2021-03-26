const exec = require('child_process').exec;
const fs = require('fs');
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

export const editJsonFile = async (path: string, keys: string[]) => {

  fs.readFile(path, (err: any, data: string) => {
    if (err) throw err;
    let parsedJSON = JSON.parse(data)
    keys.forEach((key) => {
      const configTemplatePath = configPath.resolve(__dirname, `./configs/${key}`)

      fs.readFile(configTemplatePath, "utf8", (err: any, jsonString: string) => {
        if (err) throw err;
        parsedJSON[key] = JSON.parse(jsonString);
        fs.writeFile(path, JSON.stringify(parsedJSON), (err: any, res: any) => {
          if (err) throw err;
          //Do something with callback
        })
      })
    })
  })
}

const editProjectConfigFile = async (insideProjectPath: String, projectConfigFileName: String, configFileName: string) => {

  const configTemplatePath = configPath.resolve(__dirname, `./configs/${configFileName}`)
  fs.readFile(configTemplatePath, 'utf8', (err: any, data: string) => {
    if (err) throw err;

    fs.writeFile(`${insideProjectPath}/${projectConfigFileName}`, data, (err: any) => {
      if (err) throw err;
    });
  });
}
