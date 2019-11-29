let first_page = (function() {
  buttonsFontResize();
  window.addEventListener("resize", buttonsFontResize);

  //auto resize for font-size buttons
  function buttonsFontResize() {
    buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
      if (
        (button.id != undefined) &
        (button.id.includes("login") || button.id.includes("register"))
      )
        button.style["font-size"] =
          document.body.clientWidth * (75 / 1280) + "px";
    });
  }

  function showModal(input) {
    let modal = document.querySelector(input);
    modal.style.display = "flex";
  }

  function closeModal(modal) {
    document.querySelector(modal).style.display = "none";
  }
  
  return {
    showModal,
    closeModal
  };
})();