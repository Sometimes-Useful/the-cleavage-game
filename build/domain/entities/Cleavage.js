"use strict";
exports.__esModule = true;
exports.Cleavage = void 0;
var Choice_1 = require("./Choice");
var Player_1 = require("./Player");
var Cleavage = /** @class */ (function () {
    function Cleavage(cleavageDto) {
        this.title = cleavageDto.title;
        this.leftChoice = new Choice_1.Choice(cleavageDto.leftChoice);
        this.rightChoice = new Choice_1.Choice(cleavageDto.rightChoice);
        this.players = cleavageDto.players.map(function (player) { return new Player_1.Player(player); });
    }
    Cleavage.prototype.toDto = function () {
        return {
            title: this.title,
            leftChoice: this.leftChoice.toDTO(),
            rightChoice: this.rightChoice.toDTO(),
            players: this.players.map(function (player) { return player.toDto(); })
        };
    };
    return Cleavage;
}());
exports.Cleavage = Cleavage;
