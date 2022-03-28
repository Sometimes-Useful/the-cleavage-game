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
exports.PlayerQuitUseCase = void 0;
var UseCase_1 = require("./UseCase");
var PlayerQuitUseCase = /** @class */ (function (_super) {
    __extends(PlayerQuitUseCase, _super);
    function PlayerQuitUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    PlayerQuitUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.player.players()
            .then(function (players) {
            var player = players.find(function (player) { return player.username === event.username; });
            return player ? _this.onPlayer(player) : _this.onMissingPlayer();
        });
    };
    PlayerQuitUseCase.prototype.onMissingPlayer = function () {
        return Promise.resolve();
    };
    PlayerQuitUseCase.prototype.onPlayer = function (player) {
        var _this = this;
        return this.applicationServices.player.removePlayer(player)
            .then(function () { return _this.applicationServices.cleavage.hasCleavage(); })
            .then(function (hasCleavage) { return hasCleavage
            ? _this.onCleavage(player)
            : Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerQuitUseCase.prototype.onCleavage = function (player) {
        var _this = this;
        return this.applicationServices.cleavage.removePlayerOnCleavage(player)
            .then(function () { return _this.applicationServices.cleavage.loadCleavage(); })
            .then(function (cleavage) { return _this.applicationServices.interface.updateCleavage(cleavage); })["catch"](function (error) { return Promise.reject(error); });
    };
    return PlayerQuitUseCase;
}(UseCase_1.UseCase));
exports.PlayerQuitUseCase = PlayerQuitUseCase;
