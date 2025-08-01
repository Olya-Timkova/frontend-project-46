# Gendiff - JSON/YAML comparison tool

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Olya-Timkova/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Olya-Timkova/frontend-project-46/actions)

### SonarQube status coverage:

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Olya-Timkova_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Olya-Timkova_frontend-project-46)

### GitHub Actions

![CI](https://github.com/Olya-Timkova/frontend-project-46/workflows/CI/badge.svg)

## Installation
```bash
npm install -g gendiff-package
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


## JSON format example
```bash
$ gendiff file1.json file2.json --format json
[
  {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "follow",
        "type": "added",
        "value": false
      },
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "type": "removed",
        "value": 200
      },
      {
        "key": "setting3",
        "type": "changed",
        "oldValue": true,
        "newValue": null
      },
      {
        "key": "setting4",
        "type": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "type": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "type": "nested",
        "children": [
          {
            "key": "doge",
            "type": "nested",
            "children": [
              {
                "key": "wow",
                "type": "changed",
                "oldValue": "",
                "newValue": "so much"
              }
            ]
          },
          {
            "key": "key",
            "type": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "type": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "type": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]
```

## Format comparison
| Feature          | `stylish` | `plain` | `json` |
|------------------|-----------|---------|--------|
| Output type      | Tree      | Text    | JSON   |
| Machine-readable | No        | Partial | Yes    |
| Human-readable   | Yes       | Yes     | Medium |