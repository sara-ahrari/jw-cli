const exec = require('child_process').exec;
const fs = require('fs');

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

export const editJsonFile = async (path: string) => {
  let hooksToAdd = {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }

  let lintStagedToAdd = {
    "*": [
      "prettier --write"
    ]
  }

  fs.readFile(path, (err: any, data: any) => {
    let parsedJSON = JSON.parse(data)
    parsedJSON["husky"] = hooksToAdd
    parsedJSON["lint-staged"] = lintStagedToAdd

    fs.writeFile(path, JSON.stringify(parsedJSON), (err: any, res: any) => {

    })
  })
}