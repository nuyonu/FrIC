var fractal = require("./Config/ConfigFractal");
var Fric = require("./lib/fric").Fric;
var a = new fractal.Config()
    .AddRule("F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D")
    .SetAngle(45)
    .SetAxiom("f");


var req = new Fric("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
req.AddFractal(a);
req.makeRequest();

function fetchUserData() {
    fetch("https://dsqdzkf7h2.execute-api.eu-central-1.amazonaws.com/prod/fractal?axiom=F&angle=22.5&rules=F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D&depth=1&format=png&token=s7kGlw8E99MKAss7Ep2ZYtblshOcon8omQVTc4l2yfg5H6LsTos1tVafvNTP8vF9cinBMCjozcuDgMTQ75CdTrezt4KKvGfp1v9RYepz6Nn2yxl3QgXc8bs8n0wEXNHv",
        {
            mode: 'no-cors'
        })
        .then(response => response.json())
        .then(json => console.log(json))

}
