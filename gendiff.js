#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const parse = require('./parser');
const buildDiff = require('./diffBuilder');
const getFormatter = require('./formatters');
const genDiff = require('./gendiffFoo');

function genDiff2(){
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'display help for command')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2, options) => {
      try {

        const result = genDiff(filepath1, filepath2, options.format);
        console.log(result);
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });
  
  if (process.argv.length <= 2) {
    console.log(program.helpInformation());
    process.exitCode = 1;
  } else {
    program.parse(process.argv);
  }
}
 

// Экспорт по умолчанию
module.exports = genDiff2;