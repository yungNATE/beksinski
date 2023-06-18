"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoronoiPieces = exports.Shatter = void 0;
var shatter_1 = __importDefault(require("./shatter"));
exports.Shatter = shatter_1.default;
var voronoi_1 = __importDefault(require("./generators/voronoi"));
exports.VoronoiPieces = voronoi_1.default;
