"use strict";

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

    static #formats = ["pdf", "jpeg", "canvas","png"];
}

module.exports = {
    Constants
}