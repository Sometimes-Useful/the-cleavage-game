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
exports.PlayerJoinBarUseCase = void 0;
var UseCase_1 = require("./UseCase");
var PlayerJoinBarUseCase = /** @class */ (function (_super) {
    __extends(PlayerJoinBarUseCase, _super);
    function PlayerJoinBarUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    PlayerJoinBarUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.bar.hasAvailableTableStool()
            .then(function (hasAvailableTableStool) { return hasAvailableTableStool ? _this.onTableStoolAvailable(event.username) : _this.onTableStoolUnavailable(event.username); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerJoinBarUseCase.prototype.onTableStoolAvailable = function (username) {
        return this.applicationServices.bar.installPlayerOnTableStool(username);
    };
    PlayerJoinBarUseCase.prototype.onTableStoolUnavailable = function (username) {
        var _this = this;
        return this.applicationServices.bar.hasAvailableBarStool()
            .then(function (hasAvailableBarStool) { return hasAvailableBarStool ? _this.onBarStoolAvailable(username) : _this.onBarStoolUnavailable(username); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerJoinBarUseCase.prototype.onBarStoolUnavailable = function (username) {
        return this.applicationServices.bar.playerQuit(username);
    };
    PlayerJoinBarUseCase.prototype.onBarStoolAvailable = function (username) {
        return this.applicationServices.bar.installPlayerOnBarStool(username);
    };
    return PlayerJoinBarUseCase;
}(UseCase_1.UseCase));
exports.PlayerJoinBarUseCase = PlayerJoinBarUseCase;
