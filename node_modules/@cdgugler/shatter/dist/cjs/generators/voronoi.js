"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_voronoi_1 = require("d3-voronoi");
function VoronoiPieces(_a) {
    var _b = _a.height, height = _b === void 0 ? 100 : _b, _c = _a.width, width = _c === void 0 ? 100 : _c, _d = _a.numPieces, numPieces = _d === void 0 ? 4 : _d;
    var vertices = Array(numPieces)
        .fill([0, 0])
        .map(function () {
        return [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
    });
    var v = d3_voronoi_1.voronoi().extent([
        [0, 0],
        [width, height],
    ]);
    var pieces = v(vertices).polygons();
    return pieces.map(function (piece) {
        return piece
            .filter(function (point) { return point !== piece['data']; })
            .map(function (point) {
            return [Math.ceil(point[0]), Math.ceil(point[1])];
        });
    });
}
exports.default = VoronoiPieces;
