"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bounds = /** @class */ (function () {
    function Bounds(coord) {
        this.x = { min: 0, max: 0 };
        this.y = { min: 0, max: 0 };
        this.x.min = this.x.max = coord[0];
        this.y.min = this.y.max = coord[1];
    }
    Bounds.prototype.update = function (coord) {
        if (coord[0] > this.x.max) {
            this.x.max = coord[0];
        }
        if (coord[0] < this.x.min) {
            this.x.min = coord[0];
        }
        if (coord[1] > this.y.max) {
            this.y.max = coord[1];
        }
        if (coord[1] < this.y.min) {
            this.y.min = coord[1];
        }
    };
    return Bounds;
}());
exports.default = Bounds;
