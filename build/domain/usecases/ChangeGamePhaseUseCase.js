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
exports.ChangeGamePhaseUseCase = void 0;
var GamePhase_1 = require("../entities/GamePhase");
var sound_1 = require("../entities/sound");
var SoundType_1 = require("../entities/SoundType");
var UseCase_1 = require("./UseCase");
var ChangeGamePhaseUseCase = /** @class */ (function (_super) {
    __extends(ChangeGamePhaseUseCase, _super);
    function ChangeGamePhaseUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    ChangeGamePhaseUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.cleavage.retrieveCurrentGamePhase()
            .then(function (previousGamePhase) { return _this.onPreviousGamePhase(event, previousGamePhase); });
    };
    ChangeGamePhaseUseCase.prototype.onPreviousGamePhase = function (event, previousGamePhase) {
        var _this = this;
        return this.applicationServices.cleavage.changeGamePhase(event.gamePhase)
            .then(function () { return _this.applicationServices.interface.changeGamePhase(event.gamePhase); })
            .then(function () { return previousGamePhase !== GamePhase_1.GamePhase.NONE
            ? _this.applicationServices.interface.playSound(new sound_1.Sound(SoundType_1.SupportedSound.POUFFF))
            : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return ChangeGamePhaseUseCase;
}(UseCase_1.UseCase));
exports.ChangeGamePhaseUseCase = ChangeGamePhaseUseCase;
