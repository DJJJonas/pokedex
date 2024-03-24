import "../types/pokemon.d.js";
import {
  createDivWith,
  createElementWithText,
  createIcon,
  createImg,
  titleCase,
} from "../util/util.js";
import PokemonHistory from "./history.js";
import Pokedex from "./pokedex.js";

export default class Sidebar {
  static setupEvents() {
    sidebarOpenMenu.onclick = Sidebar.openMenuHandler;

    sidebarDeleteSweep.onclick = Sidebar.deleteSweepHandler;
    sidebarCloseMenu.onclick = Sidebar.closeMenuHandler;
  }

  static openMenuHandler() {
    const initialPosition = `${-sidebar.clientWidth}px`;

    sidebar.animate(
      [
        {
          left: initialPosition,
          boxShadow: "#00000000 0px 0px 0px",
        },
        {
          left: 0,
          boxShadow: "#000000e0 0px 0px 8px",
        },
      ],
      {
        duration: 300,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }

  /**
   * Deletes only the pokemons that are not set as favorite
   */
  static deleteSweepHandler() {
    const pokemonHistory = PokemonHistory.getItems();
    const favorites = pokemonHistory.filter((pokemon) => pokemon.isFavorite);
    PokemonHistory.set(favorites);
  }

  static closeMenuHandler() {
    const finalPosition = `${-sidebar.clientWidth}px`;

    sidebar.animate(
      [
        {
          left: 0,
          boxShadow: "#000000e0 0px 0px 8px",
        },
        {
          left: finalPosition,
          boxShadow: "#00000000 0px 0px 0px",
        },
      ],
      {
        duration: 300,
        fill: "forwards",
        easing: "ease-in-out",
      }
    );
  }
  /**
   * @param {PokemonHistoryItem} item
   */
  static addPokemonHistoryItem(item) {
    const pokemon = item.pokemon;
    const pokemonName = titleCase(pokemon.name);
    const isFavorite = item.isFavorite ? "favorite" : "favorite_border";

    const li = document.createElement("li");
    const sprite = createImg(pokemon.sprites.front_default, pokemon.name);
    const name = createElementWithText("span", pokemonName);

    const upIcon = createIcon("keyboard_arrow_up");
    const favoriteIcon = createIcon(isFavorite);
    const deleteIcon = createIcon("delete");
    const downIcon = createIcon("keyboard_arrow_down");

    upIcon.classList.add("sidebar-arrow-icon");
    downIcon.classList.add("sidebar-arrow-icon");

    const icons = createDivWith(upIcon, favoriteIcon, deleteIcon, downIcon);
    icons.classList.add("sidebar-item-icons");

    li.onclick = () => Pokedex.setPokemon(item.pokemon);
    upIcon.onclick = this.createMoveHandler(item, -1);
    downIcon.onclick = this.createMoveHandler(item, 1);
    favoriteIcon.onclick = this.createFavoriteHandler(item);
    deleteIcon.onclick = this.createDeleteHandler(item);

    li.appendChild(sprite);
    li.appendChild(name);
    li.appendChild(icons);

    sidebarHistory.appendChild(li);
  }

  /**
   * @param {string} item
   * @param {number} to
   */
  static createMoveHandler(item, to) {
    return () => {
      PokemonHistory.swapItem(item.id, to);
    };
  }

  /**
   * @param {PokemonHistoryItem} item
   */
  static createFavoriteHandler(item) {
    return () => {
      PokemonHistory.setFavorite(item.id);
    };
  }

  /**
   * @param {PokemonHistoryItem} item
   */
  static createDeleteHandler(item) {
    return () => {
      PokemonHistory.delete(item.id);
    };
  }

  static refresh() {
    sidebarHistory.innerHTML = "";
    const pokemons = PokemonHistory.getItems();
    pokemons.forEach((pokemonHistory) => {
      this.addPokemonHistoryItem(pokemonHistory);
    });
  }

  /**
   * This method is used by the notify method in
   * PokemonHistory class so the sidebar refresh
   * everytime history is updated
   * @see {PokemonHistory}
   */
  static update() {
    this.refresh();
  }

  static clear() {
    sidebar.innerHTML = "";
  }
}
