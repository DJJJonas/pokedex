import "../types/pokemon.d.js";
import "../types/pokemonQuery.d.js";

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
    throw new Error("Pokémon não encontrado");
  }

  /**
   *
   * @param {string} name
   * @returns {Promise<string[]>}
   */
  static async queryName(name) {
    const body = {
      query: `query MyQuery { pokemon_v2_pokemon(where: {name: {_like: "${name}%"}}, limit: 10) { name }}`,
    };
    const r = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      headers: {
        "content-type": "application/json",
        "x-method-used": "graphiql",
      },
      body: JSON.stringify(body),
      method: "POST",
    });

    if (r.status === 200) {
      /**
       * @type {PokemonQuery}
       */
      const q = await r.json();
      const names = q.data.pokemon_v2_pokemon.map((p) => p.name);
      return names;
    }
    return [];
  }
}
