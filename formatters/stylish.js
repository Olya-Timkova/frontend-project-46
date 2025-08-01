const stringify = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const indent = '    '.repeat(depth);
  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => `${indent}    ${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${indent}}`].join('\n');
};

const formatStylish = (diff, depth = 1) => {
  const indent = '    '.repeat(depth - 1);
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}  + ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent}  - ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}  - ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}  + ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent}    ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        return `${indent}    ${node.key}: ${stringify(node.value, depth)}`;
    }
  });

  return ['{', ...lines, `${indent}}`].join('\n');
};

module.exports = formatStylish;
