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

/**
 * See https://www.w3schools.com/icons/icons_reference.asp for Google icon names
 * @param {string} iconName
 * @returns {HTMLElement}
 */
export function createIcon(iconName) {
  const i = document.createElement("i");
  i.classList.add("material-icons");
  i.textContent = iconName;
  return i;
}

/**
 * @param {string} src
 * @param {string} alt
 * @returns {HTMLImageElement}
 */
export function createImg(src, alt) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  return img;
}

/**
 *
 * @param {string} elementName
 * @param {string} text
 * @returns {HTMLElement}
 */
export function createElementWithText(elementName, text) {
  const element = document.createElement(elementName);
  element.textContent = text;
  return element;
}

/**
 * @param  {...HTMLElement} elements
 * @returns {HTMLDivElement}
 */
export function createDivWith(...elements) {
  const div = document.createElement("div");
  elements.forEach((element) => {
    div.appendChild(element);
  });
  return div;
}
