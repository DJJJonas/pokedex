import "../types/pokemonHistoryItem.d.js";

export default class PokemonHistory {
  /**
   * @typedef {Object} Observer
   * @property {Function} update
   */

  /**
   * @type {Observer[]}
   */
  static subscribers = [];

  /**
   * @param {Observer} observer
   */
  static subscribe(observer) {
    this.subscribers.push(observer);
  }

  /**
   *
   * @param {{type: string,
   *          trigger: string}} context
   */
  static notify(context) {
    this.subscribers.forEach((s) => s.update(context));
  }

  static clear() {
    localStorage.setItem("history", "[]");
  }

  /**
   * @param {Pokemon} pokemon
   * @returns {string} uuid
   */
  static save(pokemon) {
    const items = this.getItems();
    const id = crypto.randomUUID();
    items.push({
      id: id,
      isFavorite: false,
      pokemon: pokemon,
    });
    this.set(items);
    return id;
  }

  /**
   * @param {string} itemId
   */
  static delete(itemId) {
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === itemId);
    if (index === -1) {
      this.notify({
        type: "error",
        trigger: "delete",
      });
      return;
    }
    items.splice(index, 1);
    this.set(items);
  }

  /**
   * @param {string} itemId
   * @param {boolean|undefined} state If state is passed,
   * isFavorite will be set to state, else it will be toggled
   */
  static setFavorite(itemId, state) {
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === itemId);
    if (index === -1) {
      this.notify({
        type: "error",
        trigger: "favorite",
      });
      return;
    }
    items[index].isFavorite =
      state === undefined ? !items[index].isFavorite : state;
    this.set(items);
  }

  /**
   * @param {string} itemId
   * @param {number} to - use 1 to swap with the next item or -1 to swap the the one before
   */
  static swapItem(itemId, to) {
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === itemId);
    const newIndex = index + to;
    if (
      index < 0 ||
      index >= items.length ||
      newIndex < 0 ||
      newIndex >= items.length
    )
      return;

    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    this.set(items);
  }

  /**
   * @param {PokemonHistoryItem[]} item
   */
  static set(item) {
    localStorage.setItem("history", JSON.stringify(item));
    this.notify();
  }

  /**
   * @returns {PokemonHistoryItem[]}
   */
  static getItems() {
    let itemsString = localStorage.getItem("history");
    if (!itemsString) {
      itemsString = "[]";
    }
    return JSON.parse(itemsString);
  }
}
