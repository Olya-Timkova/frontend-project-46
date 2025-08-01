const formatStylish = require('./stylish');
const formatPlain = require('./plain');
const formatJson = require('./json');

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

module.exports = (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};