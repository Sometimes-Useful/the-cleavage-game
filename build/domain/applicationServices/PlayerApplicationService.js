"use strict";
exports.__esModule = true;
exports.PlayerApplicationService = void 0;
var SpriteType_1 = require("../entities/SpriteType");
var DrawEvent_1 = require("../events/draw/DrawEvent");
var PlayerJoinBarEvent_1 = require("../events/playerJoinBar/PlayerJoinBarEvent");
var PlayerApplicationService = /** @class */ (function () {
    function PlayerApplicationService(playerRepository, eventGateway) {
        this.playerRepository = playerRepository;
        this.eventGateway = eventGateway;
    }
    PlayerApplicationService.prototype.updatePosition = function (username, position) {
        var _this = this;
        return this.playerRepository.playerByUsername(username)
            .then(function (player) {
            player.position = position;
            return _this.playerRepository.save(player);
        })
            .then(function () { return _this.eventGateway.sendEvent(new DrawEvent_1.DrawEvent(username, { position: position, spriteType: SpriteType_1.SpriteType.PLAYER })); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerApplicationService.prototype.players = function () {
        return this.playerRepository.loadAllPlayers();
    };
    PlayerApplicationService.prototype.removePlayer = function (player) {
        return this.playerRepository.remove(player);
    };
    PlayerApplicationService.prototype.addPlayer = function (player) {
        var _this = this;
        return this.playerRepository.hasPlayer(player)
            .then(function (hasPlayer) { return hasPlayer ? Promise.resolve() : _this.onNewPlayer(player); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerApplicationService.prototype.onNewPlayer = function (player) {
        var _this = this;
        return this.playerRepository.save(player)
            .then(function () { return _this.eventGateway.sendEvent(new PlayerJoinBarEvent_1.PlayerJoinBarEvent(player.username)); })["catch"](function (error) { return Promise.reject(error); });
    };
    return PlayerApplicationService;
}());
exports.PlayerApplicationService = PlayerApplicationService;
