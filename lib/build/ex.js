"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
const fric_1 = require("./fric");
var fractal1 = new Config_1.Config()
    .SetAngle(2)
    .AddRule("d")
    .SetAngle(1)
    .AddRule("dasd");
var fractal2 = new Config_1.Config();
fractal2.SetAngle(2)
    .AddRule("d")
    .SetAngle(1)
    .AddRule("dasd")
    .Completed();
var fric = new fric_1.Fric('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
fric.AddFractal(fractal2);
fric.AddFractal(new Config_1.Config()
    .SetAngle(2)
    .AddRule("d")
    .SetAngle(1)
    .AddRule("dasd"));
fric.AddFractals([fractal1, fractal2]);
fric.makeRequest();
//# sourceMappingURL=ex.js.map