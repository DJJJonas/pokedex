export default class Modal {
  static setupEvents() {
    pkmSprite.onclick = () => modal.showModal();
    modal.onclick = () => modal.close();
  }

  /**
   * @param {string} src
   */
  static setImg(src) {
    modalImg.src = src;
  }

  static toggle() {
    modalContainer.classList.toggle("active");
  }
}
