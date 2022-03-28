"use strict";
exports.__esModule = true;
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(playerDTO) {
        this.username = playerDTO.username;
        this.position = playerDTO.position;
    }
    Player.prototype.toDto = function () {
        return {
            username: this.username,
            position: this.position
        };
    };
    return Player;
}());
exports.Player = Player;
