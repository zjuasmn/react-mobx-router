resolve = function() {
  let resolvedPath = '',
    resolvedAbsolute = false;
  
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();
    
    // Skip empty and invalid entries
    if (typeof path != 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }
    
    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path[0] === '/';
  }
  
  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)
  
  // Normalize the path
  resolvedPath = normalizeArray(resolvedPath.split('/'), !resolvedAbsolute).join('/');
  
  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};