"use strict";
exports.__esModule = true;
exports.Choice = void 0;
var Choice = /** @class */ (function () {
    function Choice(choiceDto) {
        this.name = choiceDto.name;
        this.players = choiceDto.players;
    }
    Choice.prototype.toDTO = function () {
        return {
            name: this.name,
            players: this.players
        };
    };
    return Choice;
}());
exports.Choice = Choice;
