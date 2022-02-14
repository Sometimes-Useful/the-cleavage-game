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
exports.CheckAutoplayUseCase = void 0;
var NewCleavageEvent_1 = require("../events/newCleavage/NewCleavageEvent");
var UseCase_1 = require("./UseCase");
var CheckAutoplayUseCase = /** @class */ (function (_super) {
    __extends(CheckAutoplayUseCase, _super);
    function CheckAutoplayUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    CheckAutoplayUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.autoplay.hasAutoplay()
            .then(function (hasAutoplay) { return hasAutoplay ? _this.onAutoPlay() : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    CheckAutoplayUseCase.prototype.onAutoPlay = function () {
        var _this = this;
        return this.applicationServices.autoplay.isTimeForNextCleavage()
            .then(function (isTimeForNextCleavage) { return isTimeForNextCleavage
            ? _this.onTimeForNextCleavage()
            : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    CheckAutoplayUseCase.prototype.onTimeForNextCleavage = function () {
        return Promise.resolve([
            this.applicationServices.autoplay.configureNextAutoPlay(),
            this.applicationServices.event.sentEvent(new NewCleavageEvent_1.NewCleavageEvent())
        ])
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return CheckAutoplayUseCase;
}(UseCase_1.UseCase));
exports.CheckAutoplayUseCase = CheckAutoplayUseCase;
