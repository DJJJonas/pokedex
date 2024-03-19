export default class Loading {
  /**
   * @param {boolean} active
   */
  static toggle(active) {
    loading.classList.toggle("active", active);
  }
}
