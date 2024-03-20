/**
 * @param {string} str
 * @returns string
 */
export function titleCase(str) {
  function titleWord() {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }

  return str.split(" ").map(titleWord).join(" ");
}

/**
 * @param {string} str
 * @param {number} limit
 */
export function truncate(str, limit) {
  const subStr = str.substring(0, limit);
  if (subStr.length === str.length) {
    return str;
  } else {
    return subStr + "...";
  }
}
