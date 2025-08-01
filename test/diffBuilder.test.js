const { describe, expect, test } = require('@jest/globals');
const { readFileSync } = require('fs');
const path = require('path');
const genDiff = require('../diffBuilder');


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('should compare flat json files correctly', () => {
    const file1 = JSON.parse(readFile('file1.json'));
    const file2 = JSON.parse(readFile('file2.json'));
    const expected = readFile('expected.txt').trim();
    
    expect(genDiff(file1, file2)).toBe(expected);
  });
});