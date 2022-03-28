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
exports.LaunchCleavageUseCase = void 0;
var UseCase_1 = require("./UseCase");
var InterfaceView_1 = require("../entities/InterfaceView");
var Cleavage_1 = require("../entities/Cleavage");
var NavigateEvent_1 = require("../events/navigateEvent/NavigateEvent");
var ChangeGamePhaseEvent_1 = require("../events/changeGamePhase/ChangeGamePhaseEvent");
var GamePhase_1 = require("../entities/GamePhase");
var LaunchCleavageUseCase = /** @class */ (function (_super) {
    __extends(LaunchCleavageUseCase, _super);
    function LaunchCleavageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    LaunchCleavageUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.chat.isConnected()
            .then(function (isConnected) { return isConnected
            ? _this.onConnected(event)
            : _this.applicationServices.event.sentEvent(new NavigateEvent_1.NavigateEvent(InterfaceView_1.InterfaceView.CONNECT_CHAT)); })["catch"](function (error) { return Promise.reject(error); });
    };
    LaunchCleavageUseCase.prototype.onConnected = function (event) {
        var _this = this;
        return this.applicationServices.player.players()
            .then(function (players) { return _this.applicationServices.cleavage.saveCleavage(new Cleavage_1.Cleavage({
            title: event.cleavageTitle,
            leftChoice: { name: event.leftChoiceName, players: [] },
            rightChoice: { name: event.rightChoiceName, players: [] },
            players: players
        })); })
            .then(function () { return _this.applicationServices.cleavage.loadCleavage(); })
            .then(function (cleavage) { return Promise.all([
            _this.applicationServices.interface.updateCleavage(cleavage),
            _this.applicationServices.cleavage.saveGlobalCleavage(cleavage)
        ]); })
            .then(function (results) { return _this.applicationServices.event.sentEvent(new ChangeGamePhaseEvent_1.ChangeGamePhaseEvent(GamePhase_1.GamePhase.CLEAVING)); })["catch"](function (error) { return Promise.reject(error); });
    };
    return LaunchCleavageUseCase;
}(UseCase_1.UseCase));
exports.LaunchCleavageUseCase = LaunchCleavageUseCase;
