export class LocalStorageAPI {
  //Tokens Obj
  static getLocalStorageTokens() {
    return JSON.parse(localStorage.getItem("authTokens"));
  }

  static setLocalStorageTokens(tokens) {
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  }

  static delLocalStorageTokens() {
    localStorage.removeItem("authTokens");
  }

  //User Obj
  static getLocalStorageUser() {
    return JSON.parse(localStorage.getItem("authUser"));
  }

  static setLocalStorageUser(user) {
    localStorage.setItem("authUser", JSON.stringify(user));
    window.dispatchEvent(new Event("storage"));
  }

  static delLocalStorageUser() {
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("storage"));
  }

  //Theme
  static getLocalStorageTheme() {
    return JSON.parse(localStorage.getItem("theme"));
  }

  static setLocalStorageTheme(mode) {
    localStorage.setItem("theme", JSON.stringify(mode));
  }
}
