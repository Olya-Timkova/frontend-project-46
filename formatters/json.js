const formatJson = (diff) => {
  const buildJsonDiff = (nodes) => nodes.map((node) => {
    const baseNode = { key: node.key };

    switch (node.type) {
      case 'added':
        return { ...baseNode, type: 'added', value: node.value };
      case 'removed':
        return { ...baseNode, type: 'removed', value: node.value };
      case 'changed':
        return {
          ...baseNode,
          type: 'changed',
          oldValue: node.oldValue,
          newValue: node.newValue,
        };
      case 'nested':
        return { ...baseNode, type: 'nested', children: buildJsonDiff(node.children) };
      case 'unchanged':
        return { ...baseNode, type: 'unchanged', value: node.value };
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return JSON.stringify(buildJsonDiff(diff), null, 2);
};

module.exports = formatJson;
