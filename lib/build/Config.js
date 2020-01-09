"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
class Config {
    constructor() {
        this.rules = new Array();
    }
    SetFormat(format) {
        if (Constants_1.default.Constants.isValidFormats(format)) {
            this.format = format;
            return this;
        }
        else
            throw "Invalid format requested";
    }
    SetAngle(angle) {
        this.angle = angle;
        return this;
    }
    SetAxiom(axiom) {
        this.axiom = axiom;
        return this;
    }
    AddRule(rule) {
        this.rules.push(rule);
        return this;
    }
    Completed() {
    }
}
exports.Config = Config;
exports.default = {
    Config
};
//# sourceMappingURL=Config.js.map