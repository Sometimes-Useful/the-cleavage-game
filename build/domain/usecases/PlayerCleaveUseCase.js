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
exports.PlayerCleaveUseCase = void 0;
var UseCase_1 = require("./UseCase");
var MessageForPlayer_1 = require("../entities/MessageForPlayer");
var playerMessages_1 = require("../entities/playerMessages");
var GamePhase_1 = require("../entities/GamePhase");
var PlayerCleaveUseCase = /** @class */ (function (_super) {
    __extends(PlayerCleaveUseCase, _super);
    function PlayerCleaveUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    PlayerCleaveUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.player.addPlayer(event.player)
            .then(function () { return _this.applicationServices.cleavage.retrieveCurrentGamePhase(); })
            .then(function (currentGamePhase) { return currentGamePhase !== GamePhase_1.GamePhase.CLEAVING
            ? _this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer_1.MessageForPlayer(event.player, playerMessages_1.waitForCleavageLaunchMessage))
            : _this.onCleavingPhase(event); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerCleaveUseCase.prototype.onCleavingPhase = function (event) {
        var _this = this;
        return this.applicationServices.cleavage.hasCleavage()
            .then(function (hasCleavage) { return hasCleavage
            ? _this.onCleavage(event)
            : _this.applicationServices.chat.sendMessageToPlayer((0, MessageForPlayer_1.noCleavagePleaseWait)(event.player)); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerCleaveUseCase.prototype.onCleavage = function (event) {
        var _this = this;
        return this.applicationServices.cleavage.playerCleave(event)
            .then(function () { return _this.updateCleavageOnInterface(); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerCleaveUseCase.prototype.updateCleavageOnInterface = function () {
        var _this = this;
        return this.applicationServices.cleavage.loadCleavage()
            .then(function (cleavage) { return _this.applicationServices.interface.updateCleavage(cleavage); })["catch"](function (error) { return Promise.reject(error); });
    };
    return PlayerCleaveUseCase;
}(UseCase_1.UseCase));
exports.PlayerCleaveUseCase = PlayerCleaveUseCase;
