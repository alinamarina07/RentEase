function preventBack() {
    if (localStorage.getItem("loggedUser")) {
      window.location.href = "index.html";
    }
  }
  function preventFalseLogout() {
    if (!localStorage.getItem("loggedUser")) {
      window.location.href = "login.html";
    }
  }
  function logOut() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
  }
  let timer;
  function logOutTimer() {
    const timerSet = 300000;
    clearTimeout(timer);
    timer = setTimeout(logOut, timerSet);
  }
  
  function handleSession() {
    window.addEventListener("click", logOutTimer);
    window.addEventListener("mouseover", logOutTimer);
    window.addEventListener("keypress", logOutTimer);
    window.addEventListener("scroll", logOutTimer);
    logOutTimer();
  }
  export { preventBack, preventFalseLogout, logOut, logOutTimer, handleSession };
  