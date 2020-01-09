"use strict";

var Data = require('./Data').Data;
var Timings = require('./Timings').Timings;

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

module.exports = {
    ResultBase
}