export function getUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
  }
  export function getDB(dbName) {
    return JSON.parse(localStorage.getItem(dbName)) || [];
  }