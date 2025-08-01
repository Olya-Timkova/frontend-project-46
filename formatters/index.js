const formatStylish = require('./stylish');
const formatPlain = require('./plain');

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

module.exports = (formatName) => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatter;
};