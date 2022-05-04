"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.RegisterStreamerUseCase = void 0;
var UseCase_1 = require("./UseCase");
var RegisterStreamerUseCase = /** @class */ (function (_super) {
    __extends(RegisterStreamerUseCase, _super);
    function RegisterStreamerUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    RegisterStreamerUseCase.prototype.execute = function (event) {
        return this.applicationServices.streamers.registerStreamer(event.username);
    };
    return RegisterStreamerUseCase;
}(UseCase_1.UseCase));
exports.RegisterStreamerUseCase = RegisterStreamerUseCase;
