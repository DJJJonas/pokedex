export default class Notification {
  static setupEvents() {
    notificationClose.onclick = () => {
      notification.style.bottom = "-100%";
    };
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
      switch (context.trigger) {
        case "favorite":
          this.show("Erro ao favoritar", "Pokémon não encontrado.");
          break;

        case "unfavorite":
          this.show("Erro ao desfavoritar", "Pokémon não encontrado.");
          break;

        case "delete":
          this.show("Erro ao deletar", "Pokémon não encontrado.");
          break;

        default:
          this.show("Erro desconhecido", "Um erro desconhecido ocorreu");
          break;
      }
    }
  }

  /**
   * @param {string} title
   * @param {string} description
   */
  static show(title, description) {
    this.clear();

    notificationTitle.innerText = title;
    notificationDescription.innerText = description;

    notification.style.bottom = "16px";
  }

  static clear() {
    notification.style.bottom = "-100%";
    notificationTitle.innerText = "";
    notificationDescription.innerText = "";
  }
}
