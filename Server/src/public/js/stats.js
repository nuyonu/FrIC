(function() {
  const token_textarea = document.querySelector("#token");
  // token_textarea.addEventListener("click", () => {
  //     token = token_textarea.select();
  //     document.execCommand("copy");
  //     window.getSelection().removeAllRanges();
  //     document.selection.empty();
  // })

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  function setUserInformation() {
    const token_textarea = document.getElementById("token");
    const remaining_requests = document.getElementById("remaining-requests");

    userId = parseJwt(localStorage.getItem("token")).id;
    const endPoint = "/api/users/" + userId;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", endPoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        token_textarea.innerHTML = json.token;
        //TOKEN
        const s_height = token_textarea.scrollHeight;
        token_textarea.setAttribute('style','height:' + s_height + 'px');
        //REMAINING REQUESTS
        const requests = "10000/10000";
        remaining_requests.value = requests;
        const remaining_requests_font_size = parseInt(window.getComputedStyle(remaining_requests).fontSize);
        remaining_requests.style.width = (requests.length + 1) * remaining_requests_font_size/2 + "px";
        //
      }
    };
    xhr.send(null);
  }

  function initializePage() {
    setUserInformation();
  }

  initializePage();
})();
