const exec = require('child_process').exec;

export const executeShellCommand = async (cmd: string, path: string) => {
  return new Promise((resolve, reject) => {
    if (path !== '') {
      exec(cmd, {cwd: path}, (error: Error, stdout: any, stderr: any) => {

        if (error) {
          reject(new Error(`exec error: ${error.message}`));
        }

         resolve(stdout ? stdout : stderr);
      });
    }
  });
}
