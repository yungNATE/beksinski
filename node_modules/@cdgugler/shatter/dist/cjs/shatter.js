"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var loadImage_1 = __importDefault(require("./lib/loadImage"));
var Bounds_1 = __importDefault(require("./lib/Bounds"));
var Shatter = /** @class */ (function () {
    function Shatter(url) {
        this.url = '';
        this.pieces = [];
        this.images = [];
        this.url = url ? url : '';
    }
    Shatter.prototype.setImage = function (img) {
        this.originalImage = img;
    };
    Shatter.prototype.setPieces = function (pieces) {
        this.pieces = pieces;
    };
    Shatter.prototype.shatter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1, results, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.originalImage) return [3 /*break*/, 4];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, loadImage_1.default(this.url)];
                    case 2:
                        _a.originalImage = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        console.error(e_1);
                        return [2 /*return*/];
                    case 4:
                        results = this.pieces.map(function (piece) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                                        var tempCanvas, tempCtx, pieceBounds, i, clippedImage, croppedImage;
                                        var _a, _b, _c, _d, _e;
                                        return __generator(this, function (_f) {
                                            switch (_f.label) {
                                                case 0:
                                                    if (!this.originalImage) {
                                                        rej('Image not set');
                                                    }
                                                    tempCanvas = document.createElement('canvas');
                                                    tempCanvas.width = (_b = (_a = this.originalImage) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0;
                                                    tempCanvas.height = (_d = (_c = this.originalImage) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 0;
                                                    tempCtx = tempCanvas.getContext('2d');
                                                    pieceBounds = new Bounds_1.default(piece[0]);
                                                    for (i = 0; i < piece.length; i++) {
                                                        if (i === 0) {
                                                            tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.beginPath();
                                                            tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.moveTo(piece[i][0], piece[i][1]);
                                                            continue;
                                                        }
                                                        tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.lineTo(piece[i][0], piece[i][1]);
                                                        if (i === piece.length - 1) {
                                                            tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.lineTo(piece[0][0], piece[0][1]);
                                                        }
                                                        pieceBounds.update(piece[i]);
                                                    }
                                                    tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.clip();
                                                    tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.drawImage((_e = this.originalImage) !== null && _e !== void 0 ? _e : new Image(), 0, 0);
                                                    return [4 /*yield*/, loadImage_1.default(tempCanvas.toDataURL('image/png'))];
                                                case 1:
                                                    clippedImage = _f.sent();
                                                    tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
                                                    tempCanvas.height = pieceBounds.y.max - pieceBounds.y.min;
                                                    tempCanvas.width = pieceBounds.x.max - pieceBounds.x.min;
                                                    tempCtx === null || tempCtx === void 0 ? void 0 : tempCtx.drawImage(clippedImage, -pieceBounds.x.min, -pieceBounds.y.min);
                                                    return [4 /*yield*/, loadImage_1.default(tempCanvas.toDataURL('image/png'))];
                                                case 2:
                                                    croppedImage = _f.sent();
                                                    res({
                                                        image: croppedImage,
                                                        x: pieceBounds.x.min,
                                                        y: pieceBounds.y.min,
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            });
                        }); });
                        _b = this;
                        return [4 /*yield*/, Promise.all(results)];
                    case 5:
                        _b.images = _c.sent();
                        return [2 /*return*/, Promise.resolve(this.images)];
                }
            });
        });
    };
    return Shatter;
}());
exports.default = Shatter;
