let stats = (function() {
  (function initializePage() {
    if(localStorage.getItem("token") == null)
    {
      tokenNotFound();
    }
    else
      setUserInformation();
  })();

  function logOut() {
    localStorage.removeItem('token');
    window.location.replace("/");
  }

  function applyCopyToClipboardById(id){
    const element = document.getElementById(id);
    element.addEventListener("click", () => {
        token = element.select();
        document.execCommand("copy");
        // alert("Token copied to clipboard!");
        
        window.getSelection().removeAllRanges();
        // document.selection.empty();
    })
  }

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
    const title = document.getElementById("title");
    const user_email = document.getElementById("user-email");
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
        token_textarea.innerText = json.token;
        //TITLE
        title.innerHTML = "My stats: " + json.username;
        //EMAIL
        user_email.innerHTML = "Email: " + json.email;
        //TOKEN
        const s_height = token_textarea.scrollHeight;
        token_textarea.setAttribute('style','height:' + s_height + 'px');
        applyCopyToClipboardById("token");
        //REMAINING REQUESTS
        const requests = json.currentRequests + "/" + json.maximumRequests;
        remaining_requests.value = requests;
        const remaining_requests_font_size = parseInt(window.getComputedStyle(remaining_requests).fontSize);
        remaining_requests.style.width = (requests.length + 1) * remaining_requests_font_size/2 + "px";
      }
    };
    xhr.send(null);
  }

  function tokenNotFound() {
    //CLEAR BODY
    document.body.innerHTML = "";
    //CREATE ELEMENT H1
    let h1 = document.createElement("h1");
    h1.className += "text-align-center my-5";
    let insideText = document.createTextNode("YOU ARE NOT AUTHORIZED. YOU MUST LOGIN.");
    h1.appendChild(insideText);
    //Append to body
    document.body.appendChild(h1);
    //CREATE ELEMENT A>H1>TEXT
    let a = document.createElement("a");
    a.href = "/";
    h1 = document.createElement("h1");
    a.appendChild(h1);
    a.className += "text-align-center";
    insideText = document.createTextNode("CLICK HERE");
    h1.appendChild(insideText);
    //Append to body
    document.body.appendChild(a);
  }

  return {
    logOut
  }
})();
