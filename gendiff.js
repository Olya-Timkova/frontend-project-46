const { Command } = require('commander');
const packageJson = require('./package.json'); // предполагается, что версия берётся из package.json

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(packageJson.version, '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command');

program.parse();