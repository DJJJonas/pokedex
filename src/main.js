import Modal from "./components/modal.js";
import PokeAPI from "./web/pokeapi.js";
import Pokedex from "./components/pokedex.js";
import Loading from "./components/loading.js";
import { truncate } from "./util/util.js";
import Notification from "./components/notification.js";

class App {
  static init() {
    this.setupEvents();
    Notification.setupEvents();
    Pokedex.clear();
  }

  static setupEvents() {
    this.setupSearchEvents();
    Modal.setupEvents();
  }

  static setupSearchEvents() {
    nameInput.onkeypress = (event) => {
      if (event.key === "Enter") {
        this.handleTextInputSearch();
      }
    };
    search.onclick = this.handleTextInputSearch;
  }

  static handleTextInputSearch() {
    const name = nameInput.value.toLowerCase().trim();
    if (name) {
      App.searchPokemon(name);
      return;
    }
    Notification.show(`Digite um pokémon`, `e aperte enter!`);
  }

  static async searchPokemon(name) {
    Pokedex.clear();
    Pokedex.setName("Carregando...");
    Pokedex.setId("só um segundo!");

    Loading.toggle(true);
    PokeAPI.fetchPokemon(name)
      .then((pokemon) => {
        Loading.toggle(false);
        Pokedex.setPokemon(pokemon);
      })
      .catch((_) => {
        Loading.toggle(false);
        Pokedex.clear();
        const pkmName = truncate(nameInput.value, 16);
        Notification.show(
          "Pokémon não encontrado",
          `Desculpe, mas o pokémon ${pkmName} não foi encontrado na base de dados.`
        );
      });
  }
}

App.init();
