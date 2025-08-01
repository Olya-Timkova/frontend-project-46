const { describe, expect, test } = require('@jest/globals');
const { readFileSync } = require('fs');
const path = require('path');
const genDiff = require('../diffBuilder');
const parse = require('../parser');
const formatPlain = require('../formatters/plain');
const formatPlain2 = require('../formatters/stylish');
const formatJson = require('../formatters/json');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  describe('stylish format', () => {
    test('should compare flat json files correctly', () => {
      const file1 = JSON.parse(readFile('file1.json'));
      const file2 = JSON.parse(readFile('file2.json'));
      const diff = genDiff(file1, file2);
      const result = formatPlain2(diff);

      const expected = readFile('expected-nested-stylish.txt').trim();

      expect(result).toBe(expected);
    });

    test('should compare nested yaml files correctly', () => {
      const file1 = parse(readFile('file1.yml'), '.yml');
      const file2 = parse(readFile('file2.yml'), '.yml');
      const diff = genDiff(file1, file2);
      const result = formatPlain2(diff);
      const expected = readFile('expected-stylish.txt').trim();

      expect(result).toBe(expected);
    });
  });

  describe('plain format', () => {
    test('should format flat differences correctly', () => {
      const file1 = JSON.parse(readFile('file3.json'));
      const file2 = JSON.parse(readFile('file4.json'));
      const diff = genDiff(file1, file2);
      const result = formatPlain(diff);
      const expected = readFile('expected-nested-plain.txt').trim();

      expect(result).toBe(expected);
    });

    test('should format nested differences correctly', () => {
      const file1 = parse(readFile('file3.yml'), '.yml');
      const file2 = parse(readFile('file4.yml'), '.yml');
      const diff = genDiff(file1, file2);
      const result = formatPlain(diff);
      const expected = readFile('expected-nested-plain.txt').trim();

      expect(result).toBe(expected);
    });

    test('should handle complex values', () => {
      const file1 = { a: { b: { c: 1 } } };
      const file2 = { a: { b: { c: 2 } } };
      const diff = genDiff(file1, file2);
      const result = formatPlain(diff);

      expect(result).toBe("Property 'a.b.c' was updated. From 1 to 2");
    });
  });

  describe('json format', () => {
    test('should format flat differences as json', () => {
      const file1 = JSON.parse(readFile('file1.json'));
      const file2 = JSON.parse(readFile('file2.json'));
      const diff = genDiff(file1, file2);
      const result = formatJson(diff);
      const expected = readFile('expected-nested-json.txt').trim();

      expect(result).toBe(expected);
    });

    test('should format nested differences as json', () => {
      const file1 = parse(readFile('file1.yml'), '.yml');
      const file2 = parse(readFile('file2.yml'), '.yml');
      const diff = genDiff(file1, file2);
      const result = formatJson(diff);
      console.log(result, 'result');
      const expected = readFile('expected-flat-json.txt').trim();

      expect(result).toBe(expected);
    });
  });
});
