"use strict";
exports.__esModule = true;
exports.welcomePlayerMessage = exports.noCleavagePleaseWait = exports.MessageForPlayer = void 0;
var MessageForPlayer = /** @class */ (function () {
    function MessageForPlayer(player, message) {
        this.player = player;
        this.message = message;
    }
    return MessageForPlayer;
}());
exports.MessageForPlayer = MessageForPlayer;
var noCleavagePleaseWait = function (player) { return ({
    player: player,
    message: "Il n'y a pas de clivage en cours ".concat(player.username, ". Attends un peu.")
}); };
exports.noCleavagePleaseWait = noCleavagePleaseWait;
var welcomePlayerMessage = function (player) { return ({
    player: player,
    message: welcomeMessage(player)
}); };
exports.welcomePlayerMessage = welcomePlayerMessage;
var welcomeMessage = function (player) { return "Bienvenue ".concat(player.username, " au jeu du clivage! Tu peux tapper '!h' pour l'aide."); };
