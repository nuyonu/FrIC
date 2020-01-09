"use strict";

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

module.exports = {
    Timings
}
