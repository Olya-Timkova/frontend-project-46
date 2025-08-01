const yaml = require('js-yaml');

const parseJson = (content) => {
  try {
    return JSON.parse(content);
  } catch (e) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }
};

const parseYaml = (content) => {
  try {
    return yaml.load(content);
  } catch (e) {
    throw new Error(`Invalid YAML: ${e.message}`);
  }
};

const parsers = {
  '.json': parseJson,
  '.yaml': parseYaml,
  '.yml': parseYaml,
};

function parse(content, ext) {
  const normalizedExt = ext.toLowerCase();
  const parser = parsers[normalizedExt];

  if (!parser) {
    throw new Error(`Unsupported file format: ${ext}. Supported formats: .json, .yaml, .yml`);
  }

  return parser(content);
}

module.exports = parse;
