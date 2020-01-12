"use strict";

class Data {

    #fractalString;
    #lengthStringFractal;
    #depth;
    #link;

    constructor(data) {
        let payload=data['payload'];
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

module.exports={
    Data
}