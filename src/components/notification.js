import Toaxt, { ToaxtStyles } from "../lib/toaxt.js";

export default class Notification {
  static setupEvents() {
    this.toaxt = new Toaxt();
    this.infoIcon = `<i class="material-icons">info_outline</i>`;
    this.errorIcon = `<i class="material-icons">error</i>`;
  }

  /**
   * This method is used by the notify method in
   * PokemonHistory class so it uses notification
   * to show log
   * @param {{type: string,
   *          trigger: string}} context
   */
  static update(context) {
    if (!context) return;

    if (context.type === "error") {
      const style = context.type;
      const pkmNotFoundMsg = "Pokémon não encontrado.";
      switch (context.trigger) {
        case "favorite":
          this.show("Erro ao favoritar", pkmNotFoundMsg, style);
          break;

        case "unfavorite":
          this.show("Erro ao desfavoritar", pkmNotFoundMsg, style);
          break;

        case "delete":
          this.show("Erro ao deletar", pkmNotFoundMsg, style);
          break;

        default:
          this.show("Erro desconhecido", "Um erro desconhecido ocorreu", style);
          break;
      }
    }
  }

  /**
   * @param {string} title
   * @param {string} description
   * @param {string|undefined} style
   */
  static show(title, description, style) {
    this.toaxt.new({
      icon: style === "error" ? this.errorIcon : this.infoIcon,
      text: `
          <span style="font-size: 1rem;font-weight: 600">${title}</span><br>
          <span style="font-size: 0.9rem;font-weight: 400">${description}</span>`,
      style: style || ToaxtStyles.info,
      duration: 3000,
    });
  }

  static clear() {
    // TODO: implement clear method on Toaxt
  }
}
