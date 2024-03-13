let limit = 20;
let offset = 0;
const url = "https://pokeapi.co/api/v2/pokemon";

function getURL() {
  return `${url}?limit=${limit}&offset=${offset}`;
}
