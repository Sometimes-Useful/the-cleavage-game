"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.expressStaticFrontEnd = void 0;
var express_1 = __importDefault(require("express"));
var path = __importStar(require("path"));
function expressStaticFrontEnd(app) {
    var publicFolderPath = path.join(__dirname, '..', '..', '..', 'public');
    var indexHtmlFilePath = path.join(publicFolderPath, 'index.html');
    app.get('/', express_1["default"].static(indexHtmlFilePath));
    app.use('/', express_1["default"].static(publicFolderPath));
}
exports.expressStaticFrontEnd = expressStaticFrontEnd;
