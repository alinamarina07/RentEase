export function getUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
  }
  export function getDB(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }