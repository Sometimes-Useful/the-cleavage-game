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
exports.StopAutoplayUseCase = void 0;
var UseCase_1 = require("./UseCase");
var StopAutoplayUseCase = /** @class */ (function (_super) {
    __extends(StopAutoplayUseCase, _super);
    function StopAutoplayUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    StopAutoplayUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.autoplay.configureNextAutoPlay(0)
            .then(function () { return _this.applicationServices.interface.disableAutoplay(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return StopAutoplayUseCase;
}(UseCase_1.UseCase));
exports.StopAutoplayUseCase = StopAutoplayUseCase;
