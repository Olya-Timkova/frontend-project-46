### Hexlet tests and linter status:
[![Actions Status](https://github.com/Olya-Timkova/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Olya-Timkova/frontend-project-46/actions)

![CI](https://github.com/Olya-Timkova/frontend-project-46/workflows/CI/badge.svg)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Olya-Timkova_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Olya-Timkova_frontend-project-46)

# Gendiff - JSON/YAML comparison tool

## Installation
```bash
npm install -g gendiff-demo-package
```

## Usage
```bash
gendiff <filepath1> <filepath2>
```

## Example

### File 1 (file1.json)
```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

### File 2 (file2.json)
```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

### Output
```bash
$ gendiff file1.json file2.json
{
    host: hexlet.io
  - proxy: 123.234.53.22
  - follow: false
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

## Example 2

### File 1 (file1.yml)
```yml

host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false

```

### File 2 (file2.yml)
```yml
timeout: 20
verbose: true
host: hexlet.io
```

### Output
```bash
$ gendiff file1.yml file2.yml
    {
+   - follow: false
        host: hexlet.io
    - proxy: 123.234.53.22
-   - follow: false
    - timeout: 50
    + timeout: 20
    + verbose: true
    }
```

## Key symbols
- ` ` (space) - no changes
- `-` - removed/changed from first file
- `+` - added/changed in second file


### Comparing nested structures (default stylish format)
```bash

$ gendiff file1.yaml file2.yaml
{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
        setting6: {
            key: value
          + ops: vops
            doge: {
              - wow: 
              + wow: so much
            }
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```
## Output format
The default `stylish` format shows differences with:
- ` ` (space) - unchanged values
- `-` - removed/changed from first file
- `+` - added/changed in second file


## Plain format example
```bash
$ gendiff file1.json file2.json --format plain
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

## Format comparison
| Feature          | `stylish`                     | `plain`                               |
|------------------|-------------------------------|---------------------------------------|
| Output type      | Tree-like with indents        | Flat list of changes                  |
| Complex values   | Shows full structure          | Shows as `[complex value]`            |
| Path display     | Nested with indentation       | Full path from root (e.g. 'a.b.c')    |
| Best for         | Human-readable visualization  | Script processing                     |