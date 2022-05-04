"use strict";
exports.__esModule = true;
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(playerDTO) {
        this.username = playerDTO.username;
        this.position = playerDTO.position;
        this.size = playerDTO.size;
    }
    Player.prototype.toDto = function () {
        return {
            username: this.username,
            position: this.position,
            size: this.size
        };
    };
    return Player;
}());
exports.Player = Player;
