import "../types/pokemon.d.js";

export default class PokeAPI {
  static URL = "https://pokeapi.co/api/v2";

  /**
   * @param {string} name
   * @returns {Promise<Pokemon>}
   * @throws {Error}
   */
  static async fetchPokemon(name) {
    const r = await fetch(`${this.URL}/pokemon/${name}`);
    if (r.status === 200) {
      return r.json();
    }
    throw new Error("Pokemon não encontrado");
  }
}
