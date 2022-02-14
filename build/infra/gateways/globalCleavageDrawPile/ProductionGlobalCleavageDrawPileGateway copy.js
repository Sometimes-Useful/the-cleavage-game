"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ProductionGlobalCleavageDrawPileGateway = void 0;
var axios_1 = __importDefault(require("axios"));
var Backend_API_URL_1 = require("../../../webServer/Backend_API_URL");
var ProductionGlobalCleavageDrawPileGateway = /** @class */ (function () {
    function ProductionGlobalCleavageDrawPileGateway() {
    }
    ProductionGlobalCleavageDrawPileGateway.prototype.drawGlobalCleavage = function () {
        return axios_1["default"].get(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW, this.config)
            .then(function (response) { return Promise.resolve(response.data); })["catch"](function (error) { return Promise.reject(error); });
    };
    ProductionGlobalCleavageDrawPileGateway.prototype.save = function (cleavage) {
        return axios_1["default"].post(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, cleavage, this.config)
            .then(function (response) { return Promise.resolve(response.data); })["catch"](function (error) { return Promise.reject(error); });
    };
    return ProductionGlobalCleavageDrawPileGateway;
}());
exports.ProductionGlobalCleavageDrawPileGateway = ProductionGlobalCleavageDrawPileGateway;
