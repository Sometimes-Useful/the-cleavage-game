"use strict";
exports.__esModule = true;
exports.welcomePlayerMessage = exports.noCleavagePleaseWait = exports.MessageForPlayer = void 0;
var MessageForPlayer = /** @class */ (function () {
    function MessageForPlayer(username, message) {
        this.username = username;
        this.message = message;
    }
    return MessageForPlayer;
}());
exports.MessageForPlayer = MessageForPlayer;
var noCleavagePleaseWait = function (username) { return ({
    username: username,
    message: "Il n'y a pas de clivage en cours ".concat(username, ". Attends un peu.")
}); };
exports.noCleavagePleaseWait = noCleavagePleaseWait;
var welcomePlayerMessage = function (username) { return ({
    username: username,
    message: welcomeMessage(username)
}); };
exports.welcomePlayerMessage = welcomePlayerMessage;
var welcomeMessage = function (username) { return "Bienvenue ".concat(username, " au jeu du clivage! Tu peux tapper '!h' pour l'aide."); };
