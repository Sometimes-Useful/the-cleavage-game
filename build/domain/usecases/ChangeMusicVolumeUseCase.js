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
exports.ChangeMusicVolumeUseCase = void 0;
var UseCase_1 = require("./UseCase");
var sound_1 = require("../entities/sound");
var SoundType_1 = require("../entities/SoundType");
var ChangeMusicVolumeUseCase = /** @class */ (function (_super) {
    __extends(ChangeMusicVolumeUseCase, _super);
    function ChangeMusicVolumeUseCase(interfaceApplicationService) {
        var _this = _super.call(this) || this;
        _this.interfaceApplicationService = interfaceApplicationService;
        return _this;
    }
    ChangeMusicVolumeUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.interfaceApplicationService.changeMusicVolumeLevel(event.volume)
            .then(function () { return _this.interfaceApplicationService.playSound(new sound_1.Sound(SoundType_1.SupportedSound.TICK)); })["catch"](function (error) { return Promise.reject(error); });
    };
    return ChangeMusicVolumeUseCase;
}(UseCase_1.UseCase));
exports.ChangeMusicVolumeUseCase = ChangeMusicVolumeUseCase;
