import { exec } from 'child_process';

export const runCommand = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      stdout ? resolve(stdout) : resolve(stderr);
    });
  });
};
