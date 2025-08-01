const buildDiff = (obj1, obj2) => {
    const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();
    
    return keys.map((key) => {
      if (!(key in obj2)) {
        return { key, value: obj1[key], type: 'removed' };
      }
      if (!(key in obj1)) {
        return { key, value: obj2[key], type: 'added' };
      }
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && obj1[key] !== null && obj2[key] !== null) {
        return { key, children: buildDiff(obj1[key], obj2[key]), type: 'nested' };
      }
      if (obj1[key] !== obj2[key]) {
        return {
          key,
          oldValue: obj1[key],
          newValue: obj2[key],
          type: 'changed'
        };
      }
      return { key, value: obj1[key], type: 'unchanged' };
    });
  };
  
module.exports = buildDiff;