#!/usr/bin/env node

const program = require('commander');
const { createProject } = require('./modules/project');

program
  .version('0.0.1')
  .description(
    'Command Lind Interface(CLI) for generate project and features from Reactism',
  );

program
  .command('create <projectName>')
  .description('Create a new project')
  .action(projectName => {
    createProject(projectName);
  });

program.parse(process.argv);
