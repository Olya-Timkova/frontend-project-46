const stringify = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return String(value);
  };
  
  const formatPlain = (diff, parentPath = '') => {
    const lines = diff.flatMap((node) => {
      const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key;
  
      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        case 'nested':
          return formatPlain(node.children, currentPath);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
  
    return lines.join('\n');
  };
  
  module.exports = formatPlain;