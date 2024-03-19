import Modal from "./components/modal.js";
import PokeAPI from "./web/pokeapi.js";
import Pokedex from "./components/pokedex.js";
import Loading from "./components/loading.js";

class App {
  static init() {
    this.setupEvents();

    Pokedex.clear();
  }

  static setupEvents() {
    this.setupSearchEvents();
    Modal.setupEvents();
  }

  static setupSearchEvents() {
    nameInput.onkeypress = (e) => {
      if (e.key === "Enter") {
        const name = nameInput.value.toLowerCase();
        this.searchPokemon(name);
      }
    };

    search.onclick = () => {
      const name = nameInput.value.toLowerCase();
      this.searchPokemon(name);
    };
  }

  static async searchPokemon(name) {
    Pokedex.clear();
    Pokedex.setName("Carregando...");
    Pokedex.setId("só um segundo!");

    Loading.toggle(true);
    PokeAPI.fetchPokemon(name)
      .then((pkm) => {
        Loading.toggle(false);
        Pokedex.setPokemon(pkm);
      })
      .catch((e) => {
        Loading.toggle(false);
        Pokedex.clear();
        alert(e);
      });
  }
}

App.init();
