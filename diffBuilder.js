function genDiff(obj1, obj2) {
    const allKeys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
    const sortedKeys = allKeys.sort();
  
    const diffLines = sortedKeys.map(key => {
      if (!(key in obj2)) {
        return `  - ${key}: ${obj1[key]}`;
      }
      if (!(key in obj1)) {
        return `  + ${key}: ${obj2[key]}`;
      }
      if (obj1[key] !== obj2[key]) {
        return [`  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`].join('\n');
      }
      return `    ${key}: ${obj1[key]}`;
    });
  
    return ['{', ...diffLines, '}'].join('\n');
  }
  
  module.exports = genDiff;