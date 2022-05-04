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
exports.DrawCleavageUseCase = void 0;
var UseCase_1 = require("./UseCase");
var sound_1 = require("../entities/sound");
var SoundType_1 = require("../entities/SoundType");
var LaunchCleavageEvent_1 = require("../events/launchCleavage/LaunchCleavageEvent");
var DrawCleavageUseCase = /** @class */ (function (_super) {
    __extends(DrawCleavageUseCase, _super);
    function DrawCleavageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    DrawCleavageUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.autoplay.hasAutoplay()
            .then(function (isAutoPlay) { return isAutoPlay ? _this.onAutoPlay(isAutoPlay) : _this.onNotAutoPlay(isAutoPlay); });
    };
    DrawCleavageUseCase.prototype.onAutoPlay = function (isAutoPlay) {
        return this.onNoPublicCleavage(isAutoPlay);
    };
    DrawCleavageUseCase.prototype.onNotAutoPlay = function (isAutoPlay) {
        var _this = this;
        return this.applicationServices.cleavage.nextPublicCleavage()
            .then(function (cleavage) { return cleavage
            ? _this.onCleavage(cleavage, isAutoPlay)
            : _this.onNoPublicCleavage(isAutoPlay); })["catch"](function (error) { return Promise.reject(error); });
    };
    DrawCleavageUseCase.prototype.onCleavage = function (cleavage, isAutoPlay) {
        var _this = this;
        return Promise.all([
            this.applicationServices.cleavage.saveCleavage(cleavage),
            this.applicationServices.interface.updateCleavage(cleavage),
            this.applicationServices.interface.playSound(new sound_1.Sound(SoundType_1.SupportedSound.DICE_ROLL))
        ])
            .then(function (results) { return isAutoPlay
            ? _this.applicationServices.event.sentEvent(new LaunchCleavageEvent_1.LaunchCleavageEvent(cleavage.title, cleavage.leftChoice.name, cleavage.rightChoice.name))
            : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    DrawCleavageUseCase.prototype.onNoPublicCleavage = function (isAutoPlay) {
        var _this = this;
        return this.applicationServices.cleavage.randomGlobalCleavage()
            .then(function (cleavage) { return cleavage
            ? _this.onCleavage(cleavage, isAutoPlay)
            : _this.onNoGlobalCleavage(); })["catch"](function (error) { return Promise.reject(error); });
    };
    DrawCleavageUseCase.prototype.onNoGlobalCleavage = function () {
        return Promise.all([
            this.applicationServices.interface.onNoCleavageAvailable(),
            this.applicationServices.interface.playSound(new sound_1.Sound(SoundType_1.SupportedSound.ERROR))
        ])
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return DrawCleavageUseCase;
}(UseCase_1.UseCase));
exports.DrawCleavageUseCase = DrawCleavageUseCase;
