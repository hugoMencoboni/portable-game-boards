/**
 * Safely get a nested property value from an object using a path string
 * @param obj - The object to get the value from
 * @param path - The path string (e.g., "a.b.c")
 * @param defaultValue - Optional default value if path is not found
 * @returns The value at the path or undefined
 */
export function getNestedProperty<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj || !path) return defaultValue;

  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}

/**
 * Safely set a nested property value in an object using a path string
 * @param obj - The object to set the value in
 * @param path - The path string (e.g., "a.b.c")
 * @param value - The value to set
 * @returns The modified object
 */
export function setNestedProperty<T = any>(
  obj: any,
  path: string,
  value: T
): any {
  if (!obj || !path) return obj;

  const keys = path.split('.');
  const lastKey = keys.pop();

  if (!lastKey) return obj;

  let current = obj;

  // Create nested objects as needed
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  // Set the final value
  current[lastKey] = value;

  return obj;
}
