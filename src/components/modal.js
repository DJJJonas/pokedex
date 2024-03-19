export default class Modal {
  static setupEvents() {
    // Make the modal not close if it's content is clicked
    modal.onclick = (e) => e.stopPropagation();

    modalContainer.onclick = () => {
      modalContainer.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 100,
      }).onfinish = () => {
        this.toggle();
      };
    };

    pkmSprite.onclick = () => {
      this.toggle();
    };
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
