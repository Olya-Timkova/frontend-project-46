#!/usr/bin/env node
const { Command } = require('commander');
const packageJson = require('./package.json');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(packageJson.version, '-V, --version', 'output the version number')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(`Comparing files:
      File 1: ${filepath1}
      File 2: ${filepath2}
      Format: ${options.format}`);
  })
  .parse(process.argv);