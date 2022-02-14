"use strict";
exports.__esModule = true;
exports.commonCleavage2 = exports.commonCleavage1 = exports.drouateChoice = exports.gocheChoice = exports.channel = exports.token = exports.username = exports.integrationTestMessage = exports.cleavageTitle2 = exports.cleavageTitle1 = exports.player2 = exports.player1 = void 0;
var Cleavage_1 = require("../entities/Cleavage");
var Player_1 = require("../entities/Player");
exports.player1 = new Player_1.Player('Billy');
exports.player2 = new Player_1.Player('Bob');
exports.cleavageTitle1 = 'Les mouchoirs en tissu';
exports.cleavageTitle2 = 'Les glaciers de l\'Ile d\'Oléron';
exports.integrationTestMessage = 'Integration Test Message';
exports.username = 'Ben';
exports.token = 'f6s53d4gsd3f4sddfd';
exports.channel = 'BenChannel';
var gocheChoice = function (players) {
    if (players === void 0) { players = []; }
    return ({ name: 'Gôche', players: players });
};
exports.gocheChoice = gocheChoice;
var drouateChoice = function (players) {
    if (players === void 0) { players = []; }
    return ({ name: 'Drouate', players: players });
};
exports.drouateChoice = drouateChoice;
var commonCleavage1 = function () { return new Cleavage_1.Cleavage(exports.cleavageTitle1, (0, exports.gocheChoice)(), (0, exports.drouateChoice)()); };
exports.commonCleavage1 = commonCleavage1;
var commonCleavage2 = function () { return new Cleavage_1.Cleavage(exports.cleavageTitle2, (0, exports.gocheChoice)(), (0, exports.drouateChoice)()); };
exports.commonCleavage2 = commonCleavage2;
