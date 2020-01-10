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
}

class Constants {
    static get Address() {
        return "https://dsqdzkf7h2.execute-api.eu-central-1.amazonaws.com/prod/fractal"
    }

    static get formats() {
        return this.#formats;
    }

    static isValidFormats(format) {
        return this.#formats.indexOf(format) !== -1;
    }

    static #formats = ["pdf", "jpeg", "canvas", "png"];
}


class Config {
    #axiom;
    #rules;
    #angle;
    #depth;
    #format;

    constructor() {
        this.#rules = new Array();
    }

    get depth() {
        if (this.#depth === undefined) {
            console.warn("The depth is not precised. Default depth will be used: 2");
            return 2;
        }
        return this.#depth;
    }

    get format() {
        if (this.#format === undefined) {
            console.warn("No format precised. Default format will be used: png");
            return 'png';
        }
        return this.#format;
    }

    get angle() {
        if (this.#angle === undefined) {
            console.warn("No angle precised.Default angle will be used :45");
            return 45;
        }
        return this.#angle;
    }

    get axiom() {
        if (this.#axiom === undefined) {
            throw "A fractal need to have a axiom";
        }
        return this.#axiom;
    }

    get rules() {
        if (this.#rules.length === 0) {
            throw "A fractal need to have at least a rule";
        }
        return this.#rules;
    }


    SetFormat(format) {
        if (typeof format != "string")
            throw "required parameter \"format\" need to be a string";
        if (Constants.Constants.isValidFormats(format)) {
            this.#format = format;
            return this;
        } else
            throw "Error:Invalid format requested" +
            "\nInfo: Valid format are: " + Constants.Constants.formats.toString();
    }

    SetDepth(depth) {
        if (typeof depth !== 'number')
            throw "Error: Depth need to be a positive integer";
        if (depth < 0)
            throw "Error: Depth need to be a positive integer";
        if (Number(depth) !== depth || depth % 1 !== 0)
            throw "Error: Depth need to be a positive integer";
        this.#depth = depth;
    }

    SetAngle(angle) {
        if (typeof angle != "number")
            throw "required parameter \"angle\" need to be a number";
        this.#angle = angle;
        return this;
    }

    SetAxiom(axiom) {
        if (typeof axiom != "string")
            throw "required parameter \"axiom\" need to be a string";
        if (axiom.length === 0)
            throw "Error: axiom string is empty";
        this.#axiom = axiom;
        return this;
    }

    AddRule(rule) {
        if (typeof rule != "string")
            throw "required parameter \"rule\" need to be a string";
        if (rule.length === 0)
            throw "Error: rule string is empty";
        this.#rules.push(rule);
        return this;
    }

    Completed() {

    }
}


class Data {

    #fractalString;
    #lengthStringFractal;
    #depth;
    #link;

    constructor(data) {
        let payload = data['payload'];
        this.#fractalString = payload['result'];
        this.#lengthStringFractal = payload['length'];
        this.#depth = payload['depth'];
        this.#link = payload['imageLink'];
    }

    get fractalString() {
        return this.#fractalString;
    }

    get lengthStringFractal() {
        return this.#lengthStringFractal;
    }

    get depth() {
        return this.#depth;
    }

    get link() {
        return this.#link;
    }


}


class ResultBase {
    #success;
    #data;
    #time;
    #why;

    constructor(result) {
        this.#success = result['status'] === 'success';
        if (!this.#success) {
            this.#why = result['data'];
        } else {
            this.#data = new Data(result['data']);
            this.#time = new Timings(result['data']);
            // var a=1;
        }
    }

    get success() {
        return this.#success;
    }

    get data() {
        return this.#data;
    }

    get time() {
        return this.#time;
    }

    get message() {
        return this.#why;
    }


}


class Timings {
    #totalTime = 0;
    #uploadTime = 0;
    #drawingTime = 0;
    #linesGenerationTime = 0;
    #stringGenerationTime = 0;

    constructor(time) {
        time = time['timings'];
        this.#totalTime = time['stringGenerationTime'];
        this.#uploadTime = time['linesGenerationTime'];
        this.#drawingTime = time['drawingTime'];
        this.#linesGenerationTime = time['uploadingTime'];
        this.#stringGenerationTime = time['totalTime'];
    }

    get totalTime() {
        return this.#totalTime;
    }

    get uploadTime() {
        return this.#uploadTime;
    }

    get drawingTime() {
        return this.#drawingTime;
    }

    get linesGenerationTime() {
        return this.#linesGenerationTime;
    }

    get stringGenerationTime() {
        return this.#stringGenerationTime;
    }


}

export default {
    Fric, Config, Data, ResultBase, Timings
}