"use strict";
exports.__esModule = true;
exports.InMemoryGamePhaseRepository = void 0;
var GamePhase_1 = require("../../../domain/entities/GamePhase");
var InMemoryGamePhaseRepository = /** @class */ (function () {
    function InMemoryGamePhaseRepository() {
        this.currentGamePhase = GamePhase_1.GamePhase.NONE;
    }
    InMemoryGamePhaseRepository.prototype.changeGamePhase = function (gamePhase) {
        this.currentGamePhase = gamePhase;
        return Promise.resolve();
    };
    InMemoryGamePhaseRepository.prototype.retrieveCurrentGamePhase = function () {
        return Promise.resolve(this.currentGamePhase);
    };
    return InMemoryGamePhaseRepository;
}());
exports.InMemoryGamePhaseRepository = InMemoryGamePhaseRepository;
