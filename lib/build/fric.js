"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_client_1 = require("http-client");
const Constants_1 = require("./Constants");
const http = require("http-client");
class Fric {
    constructor(key) {
        this.fractalsArray = new Array();
        if (Fric.isValid(key)) {
            this.key = key;
        }
    }
    // axiom=F&angle=22.5&rules=F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D&depth=6&format=png
    AddFractal(fractal) {
        this.fractalsArray.push(fractal);
    }
    AddFractals(fractals) {
        for (let i = 0; i < fractals.length; i++) {
            this.fractalsArray.push(fractals[i]);
        }
    }
    static isValid(key) {
        if (typeof key == "undefined") {
            return true;
        }
        else if (typeof key != "string")
            throw "Parameter key is not a valid parameter";
        else if (key.length !== 64)
            throw "The key is not valid";
        return true;
    }
    makeRequest() {
        const fetch = http.createFetch(http_client_1.base(Constants_1.Constants.getAddress()), // Prefix all request URLs
        http_client_1.accept('application/json'), // Set "Accept: application/json" in the request headers
        http_client_1.parse('json'));
        fetch('/customers/5').then(response => {
            console.log(response.json());
        });
    }
}
exports.Fric = Fric;
exports.default = { Fric };
//# sourceMappingURL=fric.js.map