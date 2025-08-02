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
      const filepath1 = JSON.parse(readFile('filepath1.json'));
      const filepath2 = JSON.parse(readFile('filepath2.json'));
      const diff = genDiff(filepath1, filepath2);
      const result = formatPlain2(diff);

      const expected = readFile('expected-nested-stylish.txt').trim();

      expect(result).toBe(expected);
    });

    test('should compare nested yaml files correctly', () => {
      const filepath1 = parse(readFile('filepath1.yml'), '.yml');
      const filepath2 = parse(readFile('filepath2.yml'), '.yml');
      const diff = genDiff(filepath1, filepath2);
      const result = formatPlain2(diff);
      const expected = readFile('expected-stylish.txt').trim();

      expect(result).toBe(expected);
    });
  });

  describe('plain format', () => {
    test('should format flat differences correctly', () => {
      const filepath1 = JSON.parse(readFile('filepath3.json'));
      const filepath2 = JSON.parse(readFile('filepath4.json'));
      const diff = genDiff(filepath1, filepath2);
      const result = formatPlain(diff);
      const expected = readFile('expected-nested-plain.txt').trim();

      expect(result).toBe(expected);
    });

    test('should format nested differences correctly', () => {
      const filepath1 = parse(readFile('filepath3.yml'), '.yml');
      const filepath2 = parse(readFile('filepath4.yml'), '.yml');
      const diff = genDiff(filepath1, filepath2);
      const result = formatPlain(diff);
      const expected = readFile('expected-nested-plain.txt').trim();

      expect(result).toBe(expected);
    });

    test('should handle complex values', () => {
      const filepath1 = { a: { b: { c: 1 } } };
      const filepath2 = { a: { b: { c: 2 } } };
      const diff = genDiff(filepath1, filepath2);
      const result = formatPlain(diff);

      expect(result).toBe("Property 'a.b.c' was updated. From 1 to 2");
    });
  });

  describe('json format', () => {
    test('should format flat differences as json', () => {
      const filepath1 = JSON.parse(readFile('filepath1.json'));
      const filepath2 = JSON.parse(readFile('filepath2.json'));
      const diff = genDiff(filepath1, filepath2);
      const result = formatJson(diff);
      const expected = readFile('expected-nested-json.txt').trim();

      expect(result).toBe(expected);
    });

    test('should format nested differences as json', () => {
      const filepath1 = parse(readFile('filepath1.yml'), '.yml');
      const filepath2 = parse(readFile('filepath2.yml'), '.yml');
      const diff = genDiff(filepath1, filepath2);
      const result = formatJson(diff);
      console.log(result, 'result');
      const expected = readFile('expected-flat-json.txt').trim();

      expect(result).toBe(expected);
    });
  });
});
