#!/usr/bin/env node
const { Command } = require('commander');
const { readFileSync } = require('fs');
const path = require('path');
const parse = require('./parser');
const buildDiff = require('./diffBuilder');
const getFormatter = require('./formatters');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]  output format')
  .action((filepath1, filepath2, options) => {
    try {
      const absolutePath1 = path.resolve(process.cwd(), filepath1);
      const absolutePath2 = path.resolve(process.cwd(), filepath2);

      const content1 = readFileSync(absolutePath1, 'utf8');
      const content2 = readFileSync(absolutePath2, 'utf8');

      const data1 = parse(content1, path.extname(absolutePath1));
      const data2 = parse(content2, path.extname(absolutePath2));

      const diff = buildDiff(data1, data2);
      const format = options.format || 'stylish';
      const formatter = getFormatter(format);
      console.log(formatter(diff));
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

if (process.argv.length < 4) {
  program.help();
} else {
  program.parse(process.argv);
}
