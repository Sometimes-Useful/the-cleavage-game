"use strict";
exports.__esModule = true;
exports.InMemoryPlayerRepository = void 0;
var InMemoryPlayerRepository = /** @class */ (function () {
    function InMemoryPlayerRepository() {
        this.currentPlayers = [];
    }
    InMemoryPlayerRepository.prototype.hasPlayer = function (player) {
        var includePlayer = this.currentPlayers.some(function (includedplayer) { return includedplayer.username === player.username; });
        return Promise.resolve(includePlayer);
    };
    InMemoryPlayerRepository.prototype.loadAllPlayers = function () {
        return Promise.resolve(this.currentPlayers);
    };
    InMemoryPlayerRepository.prototype.remove = function (player) {
        this.currentPlayers = this.currentPlayers.filter(function (currentPlayer) { return currentPlayer.username !== player.username; });
        return Promise.resolve();
    };
    InMemoryPlayerRepository.prototype.add = function (player) {
        this.currentPlayers.push(player);
        return Promise.resolve();
    };
    return InMemoryPlayerRepository;
}());
exports.InMemoryPlayerRepository = InMemoryPlayerRepository;
