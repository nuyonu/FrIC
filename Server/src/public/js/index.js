let first_page = (function() {
  (function initializePage() {
    if (localStorage.getItem("token")) window.location.replace("/home");
  })();
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

  function register() {
    const body = {
      username: document.getElementById("username-register").value,
      password: document.getElementById("password-register").value,
      email: document.getElementById("email-register").value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/users", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let json = JSON.parse(xhr.responseText);
          closeModal('.modal-register');
          swal({
            title: "You have successfully registered",
            icon: "success",
          });
        }
        else if(xhr.readyState === 4 && xhr.status == 400) {
          let json = JSON.parse(xhr.responseText);
          if(json.message.includes("#"))
          {
            json.message = json.message.split("#").join("\n");
          }
          swal({
            title: "Invalid",
            text: json.message,
            icon: "error",
          });
        }
    };
    let data = JSON.stringify(body);
    xhr.send(data);
  }

  function login() {
    const body = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/auth", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        localStorage.setItem("token", json.token);
        window.location.replace("/home");
      } else if(xhr.readyState === 4 && xhr.status == 400) {
        let json = JSON.parse(xhr.responseText);
        swal({
          title: "Invalid",
          text: json.message,
          icon: "error",
        });
      }
    };
    let data = JSON.stringify(body);
    xhr.send(data);
  }

  return {
    showModal,
    closeModal,
    register,
    login
  };
})();
