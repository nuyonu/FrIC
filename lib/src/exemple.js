var fractal = require("./Config/ConfigFractal");
var Fric=require("./lib/fric").Fric;
var a = new fractal.Config()
    .AddRule("F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D")
    .SetAngle(45)
    .SetAxiom("f");


var req= new Fric("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
req.AddFractal(a);
req.makeRequest();
