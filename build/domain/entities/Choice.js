"use strict";
exports.__esModule = true;
exports.Choice = void 0;
var Player_1 = require("./Player");
var Choice = /** @class */ (function () {
    function Choice(choiceDto) {
        this.name = choiceDto.name;
        this.players = choiceDto.players.map(function (player) { return new Player_1.Player(player); });
    }
    Choice.prototype.toDTO = function () {
        return {
            name: this.name,
            players: this.players.map(function (player) { return player.toDto(); })
        };
    };
    return Choice;
}());
exports.Choice = Choice;
