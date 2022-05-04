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
exports.RefreshRegisteredStreamersUseCase = void 0;
var UseCase_1 = require("./UseCase");
var RefreshRegisteredStreamersUseCase = /** @class */ (function (_super) {
    __extends(RefreshRegisteredStreamersUseCase, _super);
    function RefreshRegisteredStreamersUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    RefreshRegisteredStreamersUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.streamers.retrieveAllStreamers()
            .then(function (streamers) { return _this.applicationServices.interface.updateRegisteredStreamers(streamers); })["catch"](function (error) { return Promise.reject(error); });
    };
    return RefreshRegisteredStreamersUseCase;
}(UseCase_1.UseCase));
exports.RefreshRegisteredStreamersUseCase = RefreshRegisteredStreamersUseCase;
