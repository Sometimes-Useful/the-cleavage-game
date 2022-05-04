"use strict";
exports.__esModule = true;
exports.PlayerApplicationService = void 0;
var Player_1 = require("../entities/Player");
var SpriteType_1 = require("../entities/SpriteType");
var DrawEvent_1 = require("../events/draw/DrawEvent");
var PlayerJoinBarEvent_1 = require("../events/playerJoinBar/PlayerJoinBarEvent");
var testContexts_1 = require("../tests/testContexts");
var PlayerApplicationService = /** @class */ (function () {
    function PlayerApplicationService(playerRepository, eventGateway) {
        this.playerRepository = playerRepository;
        this.eventGateway = eventGateway;
    }
    PlayerApplicationService.prototype.playerByUsername = function (username) {
        return this.playerRepository.playerByUsername(username);
    };
    PlayerApplicationService.prototype.updatePosition = function (username, position, size) {
        var _this = this;
        return this.playerRepository.playerByUsername(username)
            .then(function (player) {
            player.position = position;
            return _this.playerRepository.save(player);
        })
            .then(function () { return _this.eventGateway.sendEvent(new DrawEvent_1.DrawEvent(username, { position: position, size: size, spriteType: SpriteType_1.SpriteType.PLAYER })); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerApplicationService.prototype.players = function () {
        return this.playerRepository.loadAllPlayers();
    };
    PlayerApplicationService.prototype.removePlayer = function (player) {
        return this.playerRepository.remove(player);
    };
    PlayerApplicationService.prototype.addPlayer = function (username) {
        var _this = this;
        return this.playerRepository.hasPlayer(username)
            .then(function (hasPlayer) { return hasPlayer ? Promise.resolve() : _this.onNewPlayer(username); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerApplicationService.prototype.onNewPlayer = function (username) {
        var _this = this;
        var player = new Player_1.Player({
            username: username,
            size: testContexts_1.defaultPlayerSize
        });
        return this.playerRepository.save(player)
            .then(function () { return _this.eventGateway.sendEvent(new PlayerJoinBarEvent_1.PlayerJoinBarEvent(player.username)); })["catch"](function (error) { return Promise.reject(error); });
    };
    return PlayerApplicationService;
}());
exports.PlayerApplicationService = PlayerApplicationService;
