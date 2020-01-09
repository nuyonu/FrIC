"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
    static getAddress() {
        return "https://dsqdzkf7h2.execute-api.eu-central-1.amazonaws.com/prod/fractal";
    }
    static isValidFormats(format) {
        return this.formats.indexOf(format) != -1;
    }
}
exports.Constants = Constants;
Constants.formats = ["pdf", "jped", "canvas"];
exports.default = {
    Constants
};
//# sourceMappingURL=Constants.js.map