const { describe, expect, test } = require('@jest/globals');
const { readFileSync } = require('fs');
const path = require('path');
const genDiff = require('../diffBuilder');
const parse = require('../parser');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('should compare flat json files correctly', () => {
    const file1 = JSON.parse(readFile('file1.json'));
    const file2 = JSON.parse(readFile('file2.json'));
    const expected = readFile('expected.txt').trim();
    
    expect(genDiff(file1, file2)).toBe(expected);
  });

  test('should compare flat yml files correctly', () => {
    const absolutePath1 = path.resolve('../file1.yml');
    const absolutePath2 = path.resolve('../file2.yml');

    const data1 = parse(readFile('file1.yml'), path.extname(absolutePath1));
    const data2 = parse(readFile('file2.yml'), path.extname(absolutePath2));

    const expected = readFile('expected.txt').trim();
    
    expect(genDiff(data1, data2)).toBe(expected);
  });
});