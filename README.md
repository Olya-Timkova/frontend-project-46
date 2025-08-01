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