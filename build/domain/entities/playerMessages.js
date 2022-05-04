"use strict";
exports.__esModule = true;
exports.helpMessage = exports.multipleCleaveOptionsAvailable = exports.cleavageAlreadySuggested = exports.cleavageSuggested = exports.waitForCleavageLaunchMessage = exports.dontKnowWhatToDoWithThatMessage = exports.missingTitleMessage = void 0;
var applicationMessagePrefix_1 = require("./applicationMessagePrefix");
var AuthorizedMessage_1 = require("./AuthorizedMessage");
exports.missingTitleMessage = 'Il manque le titre ma gueule!';
var dontKnowWhatToDoWithThatMessage = function (username) { return "I don't know what to do with that ".concat(username, "."); };
exports.dontKnowWhatToDoWithThatMessage = dontKnowWhatToDoWithThatMessage;
exports.waitForCleavageLaunchMessage = 'Wait for cleavage launch! 👀';
var cleavageSuggested = function (username, cleavageTitle) { return "Cleavage '".concat(cleavageTitle, "' suggested to streamer.\n You rocks ").concat(username, "! \uD83D\uDC4D"); };
exports.cleavageSuggested = cleavageSuggested;
exports.cleavageAlreadySuggested = 'Cleavage already suggested.';
var multipleCleaveOptionsAvailable = function (cleavage) { return "C'est pas clair... Voila les choix possibles '".concat(cleavage.leftChoice.name, "', '").concat(cleavage.rightChoice.name, "'."); };
exports.multipleCleaveOptionsAvailable = multipleCleaveOptionsAvailable;
exports.helpMessage = "Le jeu du clivage!\nUn jeu pour tout la famille.\nEn tant que joueur tu peux:\n- [ ".concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.HELP, " ] Afficher l'aide (tu viens de le faire XD).\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_HELP, " ] Afficher l'aide (tu viens de le faire XD).\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SUGGEST_CLEAVAGE, " {Nom du clivage} ] Proposer un clivage.\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.LEFT, " ] Cliver \u00E0 G\u00F4che.\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.RIGHT, " ] Cliver \u00E0 Drouate.\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_APPLAUSE, " ] Applaudir.\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_HYPERLIKE, " ] Kiffer.\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_SHOOT, " ] Huer.\n- [ ").concat(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_WHISTLE, " ] Siffler.\nAttention... \u00E7a va cliver!");
