"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AxiosGlobalCleavageDrawPileGateway = void 0;
var axios_1 = __importDefault(require("axios"));
var Backend_API_URL_1 = require("../../../api/Backend_API_URL");
var AxiosGlobalCleavageDrawPileGateway = /** @class */ (function () {
    function AxiosGlobalCleavageDrawPileGateway(endpoint, port) {
        this.endpoint = endpoint;
        this.port = port;
        this.backendApiInstance = axios_1["default"].create({
            baseURL: "http://".concat(this.endpoint, ":").concat(this.port)
        });
    }
    AxiosGlobalCleavageDrawPileGateway.prototype.drawGlobalCleavage = function () {
        return this.backendApiInstance.get(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_DRAW)
            .then(function (response) { return Promise.resolve(response.data); })["catch"](function (error) { return Promise.reject(error); });
    };
    AxiosGlobalCleavageDrawPileGateway.prototype.save = function (cleavage) {
        return this.backendApiInstance.post(Backend_API_URL_1.BACKEND_API_URL.GLOBAL_CLEAVAGE_DRAWPILE_SAVE, cleavage)
            .then(function (response) { return Promise.resolve(response.data); })["catch"](function (error) { return Promise.reject(error); });
    };
    return AxiosGlobalCleavageDrawPileGateway;
}());
exports.AxiosGlobalCleavageDrawPileGateway = AxiosGlobalCleavageDrawPileGateway;
