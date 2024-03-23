import Modal from "./components/modal.js";
import PokeAPI from "./web/pokeapi.js";
import Pokedex from "./components/pokedex.js";
import Loading from "./components/loading.js";
import { truncate } from "./util/util.js";
import Notification from "./components/notification.js";
import Sidebar from "./components/sidebar.js";
import PokemonHistory from "./components/history.js";

class App {
  static init() {
    this.setupEvents();
    this.setupObservers();

    Pokedex.clear();
    Sidebar.refresh();
  }

  static setupEvents() {
    this.setupAutoCompleteEvent();
    this.setupSearchEvents();
    Modal.setupEvents();
    Notification.setupEvents();
    Sidebar.setupEvents();
  }

  static setupObservers() {
    PokemonHistory.subscribe(Sidebar);
    PokemonHistory.subscribe(Notification);
  }

  static setupAutoCompleteEvent() {
    const charLimit = 3;
    nameInput.oninput = () => {
      const input = nameInput.value;
      if (input.length <= charLimit) {
        this.setAutoCompleteDatalist([]);
        return;
      }

      // Take easy on pokeapi by not quering unnecessarily
      if (
        nameDatalist.childElementCount > 0 &&
        nameDatalist.childElementCount <= 10
      ) {
        return;
      }

      PokeAPI.queryName(input.toLowerCase().replaceAll(" ", "-")).then(
        (names) => {
          this.setAutoCompleteDatalist(names);
        }
      );
    };
  }

  /**
   * @param {string[]} list
   */
  static setAutoCompleteDatalist(list) {
    nameDatalist.innerHTML = "";
    list.forEach((o) => {
      nameDatalist.innerHTML += `<option value="${o}">${o}<option/>`;
    });
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
    /**
     * @type {string}
     */
    const name = nameInput.value.toLowerCase().trim();
    if (name) {
      App.searchPokemon(name);
      return;
    }
    Notification.show(`Digite um pokémon`, `e aperte enter!`);
  }

  /**
   * @param {string} name
   */
  static async searchPokemon(name) {
    Pokedex.clear();
    Pokedex.setName("Carregando...");
    Pokedex.setId("só um segundo!");

    Loading.toggle(true);
    PokeAPI.fetchPokemon(name)
      .then((pokemon) => {
        Loading.toggle(false);
        Pokedex.setPokemon(pokemon);
        PokemonHistory.save(pokemon);
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
