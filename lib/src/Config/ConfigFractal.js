"use strict";


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

module.exports = {
    Config
};