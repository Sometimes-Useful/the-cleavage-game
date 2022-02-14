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
exports.StartAutoplayUseCase = void 0;
var DrawCleavageEvent_1 = require("../events/drawCleavage/DrawCleavageEvent");
var UseCase_1 = require("./UseCase");
var StartAutoplayUseCase = /** @class */ (function (_super) {
    __extends(StartAutoplayUseCase, _super);
    function StartAutoplayUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    StartAutoplayUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.autoplay.configureNextAutoPlay(event.autoplayMinutes)
            .then(function () { return _this.applicationServices.interface.enableAutoplay(); })
            .then(function () { return _this.applicationServices.event.sentEvent(new DrawCleavageEvent_1.DrawCleavageEvent()); })["catch"](function (error) { return Promise.reject(error); });
    };
    return StartAutoplayUseCase;
}(UseCase_1.UseCase));
exports.StartAutoplayUseCase = StartAutoplayUseCase;
