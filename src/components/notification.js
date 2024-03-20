export default class Notification {
  static setupEvents() {
    notificationClose.onclick = () => {
      notification.style.bottom = "-100%";
    };
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
