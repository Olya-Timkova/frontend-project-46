### Hexlet tests and linter status:
[![Actions Status](https://github.com/Olya-Timkova/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Olya-Timkova/frontend-project-46/actions)

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

## Key symbols
- ` ` (space) - no changes
- `-` - removed/changed from first file
- `+` - added/changed in second file