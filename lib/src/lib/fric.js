"use strict";

var Constants = require('../Config/Constants').Constants;
const fetch = require('node-fetch');
const Result = require('../Results/ResultBase').ResultBase;

class Fric {

    #fractalsArray;
    #address;
    #key;
    #fetch;
    #results;

    constructor(key) {
        this.#fractalsArray = [];
        this.#results = [];
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
        } else if (typeof key != "string")
            throw "Parameter key is not a valid parameter";
        else if (key.length !== 64)
            throw "The key is not valid";
        return true;
    }

    async makeRequest(downloadAssets = false) {
        let result;
        for (let i = 0; i < this.#fractalsArray.length; i++) {
            result = await fetch(Constants.Address + "?axiom=F&angle=22.5&rules=&depth=1&format=png&rules=F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D")
                .then(res => res.json())
                .then(json => {
                    return json
                });
            this.#results.push(new Result(result));
        }
    }

    load(index, id) {
        if (typeof index !== "number")
            throw "index should be a positive integer";
        if (index < 0 || index > this.#fractalsArray.length)
            throw  "Invalid index for list of fractals";
        let format = this.#fractalsArray[index].format;
        switch (format) {
            case "pdf":
                console.log("Not implemented");
                break;
            case "jpeg":
                console.log("Not implemented");
                break;
            case "canvas":
                console.log("Not implemented");
                break;


        }
    }

    #loadImage(id) {

    }


}

module.exports = {
    Fric
}
'F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D'
'FF+[+F-F-F]-[-F+F+F]'