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
exports.CancelCleavageUseCase = void 0;
var sound_1 = require("../entities/sound");
var SoundType_1 = require("../entities/SoundType");
var UseCase_1 = require("./UseCase");
var CancelCleavageUseCase = /** @class */ (function (_super) {
    __extends(CancelCleavageUseCase, _super);
    function CancelCleavageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    CancelCleavageUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.interface.clearCleavage()
            .then(function () { return _this.applicationServices.interface.playSound(new sound_1.Sound(SoundType_1.SupportedSound.QUACK)); })["catch"](function (error) { return Promise.reject(error); });
    };
    return CancelCleavageUseCase;
}(UseCase_1.UseCase));
exports.CancelCleavageUseCase = CancelCleavageUseCase;
