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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.NewCleavageUseCase = void 0;
var InterfaceView_1 = require("../entities/InterfaceView");
var UseCase_1 = require("./UseCase");
var NavigateEvent_1 = require("../events/navigateEvent/NavigateEvent");
var DrawCleavageEvent_1 = require("../events/drawCleavage/DrawCleavageEvent");
var NewCleavageUseCase = /** @class */ (function (_super) {
    __extends(NewCleavageUseCase, _super);
    function NewCleavageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    NewCleavageUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.chat.isConnected()
            .then(function (isConnected) { return isConnected
            ? _this.onConnected()
            : _this.applicationServices.event.sentEvent(new NavigateEvent_1.NavigateEvent(InterfaceView_1.InterfaceView.CONNECT_CHAT)); })["catch"](function (error) { return Promise.reject(error); });
    };
    NewCleavageUseCase.prototype.onConnected = function () {
        var _this = this;
        return this.applicationServices.interface.newCleavage()
            .then(function () { return _this.applicationServices.autoplay.hasAutoplay(); })
            .then(function (hasAutoplay) { return _this.applicationServices.event.sentEvents(__spreadArray([
            new NavigateEvent_1.NavigateEvent(InterfaceView_1.InterfaceView.NEW_CLEAVAGE)
        ], (hasAutoplay ? [new DrawCleavageEvent_1.DrawCleavageEvent()] : []), true)); })["catch"](function (error) { return Promise.reject(error); });
    };
    return NewCleavageUseCase;
}(UseCase_1.UseCase));
exports.NewCleavageUseCase = NewCleavageUseCase;
