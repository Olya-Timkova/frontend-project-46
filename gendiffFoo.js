// gendiff.js (основной модуль)
const fs = require('fs');
const path = require('path');
const parse = require('./parser');
const buildDiff = require('./diffBuilder');
const getFormatter = require('./formatters');

function genDiff(filepath1, filepath2, format = 'stylish') {
 
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  console.log(absolutePath1,'absolutePath1')
  console.log(absolutePath2,'absolutePath2')

  if (!fs.existsSync(absolutePath1) || !fs.existsSync(absolutePath2)) {
    throw new Error('File not found');
  }
  console.log(format,'тест 3')
  const content1 = fs.readFileSync(absolutePath1, 'utf8');
  const content2 = fs.readFileSync(absolutePath2, 'utf8');
  console.log(format,'тест 4')
  const data1 = parse(content1, path.extname(absolutePath1));
  const data2 = parse(content2, path.extname(absolutePath2));
  console.log(format,'тест 5')
  const diff = buildDiff(data1, data2);
  console.log(format,'тест 6')
  const formatter = getFormatter(format);


  console.log(format,'format')


  console.log('Data1:', JSON.stringify(data1, null, 2));
  console.log('Data2:', JSON.stringify(data2, null, 2));

  console.log('мой formatter', formatter)
  // console.log('Diff:', diff);
  // console.log('Formatted result:', formatter(diff));
  return formatter(diff);
}

module.exports = genDiff;