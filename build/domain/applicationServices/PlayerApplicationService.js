"use strict";
exports.__esModule = true;
exports.PlayerApplicationService = void 0;
var PlayerApplicationService = /** @class */ (function () {
    function PlayerApplicationService(playerRepository) {
        this.playerRepository = playerRepository;
    }
    PlayerApplicationService.prototype.players = function () {
        return this.playerRepository.loadAllPlayers();
    };
    PlayerApplicationService.prototype.removePlayer = function (player) {
        return this.playerRepository.remove(player);
    };
    PlayerApplicationService.prototype.addPlayer = function (player) {
        var _this = this;
        return this.playerRepository.hasPlayer(player)
            .then(function (hasPlayer) { return hasPlayer ? Promise.resolve() : _this.playerRepository.add(player); });
    };
    return PlayerApplicationService;
}());
exports.PlayerApplicationService = PlayerApplicationService;
