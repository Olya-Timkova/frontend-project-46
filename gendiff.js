#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const parse = require('./parser');
const genDiff = require('./diffBuilder');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    try {
      const absolutePath1 = path.resolve(process.cwd(), filepath1);
      const absolutePath2 = path.resolve(process.cwd(), filepath2);

      const content1 = fs.readFileSync(absolutePath1, 'utf8');
      const content2 = fs.readFileSync(absolutePath2, 'utf8');

      const data1 = parse(content1, path.extname(absolutePath1));
      const data2 = parse(content2, path.extname(absolutePath2));

      console.log(genDiff(data1, data2));
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);