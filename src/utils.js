import pathToRegexp from "path-to-regexp";

// Copy and modified from 'path'
export function normalizeArray(parts, allowAboveRoot) {
  let res = [];
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];
    
    // ignore empty parts
    if (!p || p === '.')
      continue;
    
    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop();
      } else if (allowAboveRoot) {
        res.push('..');
      }
    } else {
      res.push(p);
    }
  }
  
  return res;
}

// Copy and modified from 'path'
export function resolve() {
  let resolvedPath = '',
    resolvedAbsolute = false;
  
  for (let i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path = (i >= 0) ? arguments[i] : '/';
    
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
}


// Copy and modified from 'React-Router'
const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (pattern, options) => {
  const cacheKey = `${options.end}${options.strict}`;
  const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
  
  if (cache[pattern])
    return cache[pattern];
  
  const keys = [];
  const re = pathToRegexp(pattern, keys, options);
  const compiledPattern = { re, keys };
  
  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++
  }
  
  return compiledPattern
};

/***
 *
 * @param pathname
 * @param path abs path
 * @param options
 * @returns {*} null is not match,
 */
export function matchPath(pathname, path, options = {}){
  const {exact = false, strict = false} = options;
  
  if (!path)
    return {url: pathname, isExact: true, params: {}};
  
  const {re, keys} = compilePath(path, {end: exact, strict});
  const match = re.exec(pathname);
  
  if (!match)
    return null;
  
  const [url, ...values] = match;
  const isExact = pathname === url;
  
  if (exact && !isExact)
    return null;
  
  return ({
    path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact, // whether or not we matched exactly
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo
    }, {})
  })
}
  