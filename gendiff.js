#!/usr/bin/env node
const { Command } = require('commander');
const path = require('path');
const genDiff = require('./gendiffFoo'); // Импорт основной функции сравнения

function runCLI() {
  const program = new Command();
  let result = null;

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'display help for command')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish') // Добавлено значение по умолчанию
    .action((filepath1, filepath2, options) => {
      try {
        result = genDiff(
          path.resolve(filepath1),
          path.resolve(filepath2),
          options.format
        );
        console.log(result);
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    });

  if (process.argv.length <= 2) {
    program.help();
    process.exit(1);
  }

  program.parse(process.argv);
  return result; // Явно возвращаем результат
}

// Экспорт функции для тестирования
module.exports = runCLI;

// Запуск CLI только при прямом вызове
if (require.main === module) {
  runCLI();
}