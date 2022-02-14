"use strict";
exports.__esModule = true;
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(playerDTO) {
        this.username = playerDTO.username;
    }
    Player.prototype.toDto = function () {
        return {
            username: this.username
        };
    };
    return Player;
}());
exports.Player = Player;
