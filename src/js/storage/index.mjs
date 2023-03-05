/**
 * Saves a key value to localstorage
 * @param {string} key
 * @param {*} value
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Gets an object from localstorage by key
 * @param {string} key
 * @returns A json object for specified key
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Removes a key and value from localstorage
 * @param {string} key Key you want to remove
 */
export function remove(key) {
  localStorage.removeItem(key);
}
