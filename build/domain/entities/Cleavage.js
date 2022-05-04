"use strict";
exports.__esModule = true;
exports.Cleavage = void 0;
var Choice_1 = require("./Choice");
var Cleavage = /** @class */ (function () {
    function Cleavage(cleavageDto) {
        this.title = cleavageDto.title;
        this.leftChoice = new Choice_1.Choice(cleavageDto.leftChoice);
        this.rightChoice = new Choice_1.Choice(cleavageDto.rightChoice);
        this.players = cleavageDto.players;
    }
    Cleavage.prototype.majorScore = function () {
        var majorChoice = this.majorChoice();
        var totalCleave = this.leftChoice.players.length + this.rightChoice.players.length;
        return majorChoice
            ? majorChoice === this.leftChoice.name
                ? this.leftChoice.players.length / totalCleave * 100
                : this.rightChoice.players.length / totalCleave * 100
            : 50;
    };
    Cleavage.prototype.majorChoice = function () {
        return this.leftChoice.players.length > this.rightChoice.players.length
            ? this.leftChoice.name
            : this.leftChoice.players.length < this.rightChoice.players.length
                ? this.rightChoice.name
                : undefined;
    };
    Cleavage.prototype.toDto = function () {
        return {
            title: this.title,
            leftChoice: this.leftChoice.toDTO(),
            rightChoice: this.rightChoice.toDTO(),
            players: this.players
        };
    };
    return Cleavage;
}());
exports.Cleavage = Cleavage;
