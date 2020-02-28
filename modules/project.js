const chalk = require('chalk');
const ora = require('ora');
const cmd = require('node-cmd');

const spinner = ora('Creating a Next Project...').start();

const stepAfterClone = projectName => {
  spinner.text = 'Installing dependencies...';
  cmd.get(
    `cd ${projectName} && rm -rf .git && rm -rf .github  && rm -rf LICENSE  && rm -rf CODE_OF_CONDUCT.md && yarn`,
    err => {
      if (!err) {
        spinner.color = 'green';
        spinner.succeed(
          `Thanks for using ${chalk.cyan(
            'Reactism',
          )} as your React Boilerplate. ENJOY!!!`,
        );
      } else {
        spinner.color = 'red';
        spinner.fail(`Something wrong: ${chalk.red(err)}`);
      }
    },
  );
};

const createProject = projectName => {
  cmd.get(
    `git clone --depth=1 https://github.com/GifaEriyanto/nextjs-starter.git ${projectName}`,
    (err, data) => {
      if (!data.indexOf('fatal') || err) {
        spinner.color = 'red';
        spinner.fail(`Something wrong: ${chalk.red(err)}`);
      } else {
        stepAfterClone(projectName);
      }
    },
  );
};

module.exports = { createProject };
