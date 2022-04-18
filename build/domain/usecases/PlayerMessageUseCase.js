"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PlayerMessageUseCase = void 0;
var UseCase_1 = require("./UseCase");
var applicationMessagePrefix_1 = require("../entities/applicationMessagePrefix");
var AuthorizedMessage_1 = require("../entities/AuthorizedMessage");
var PlayerCleave_1 = require("../entities/PlayerCleave");
var PlayerCleaveEvent_1 = require("../events/playerCleave/PlayerCleaveEvent");
var MessageForPlayer_1 = require("../entities/MessageForPlayer");
var PlayerSuggestCleavageEvent_1 = require("../events/suggestCleavage/PlayerSuggestCleavageEvent");
var Cleavage_1 = require("../entities/Cleavage");
var playerMessages_1 = require("../entities/playerMessages");
var PlayerApplauseEvent_1 = require("../events/playerApplause/PlayerApplauseEvent");
var PlayerShootEvent_1 = require("../events/playerShoot/PlayerShootEvent");
var PlayerHyperLikeEvent_1 = require("../events/playerHyperLike/PlayerHyperLikeEvent");
var PlayerWhistleEvent_1 = require("../events/playerWhistle/PlayerWhistleEvent");
var PlayerAskForHelpEvent_1 = require("../events/playerAskForHelp/PlayerAskForHelpEvent");
var PlayerMessageUseCase = /** @class */ (function (_super) {
    __extends(PlayerMessageUseCase, _super);
    function PlayerMessageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    PlayerMessageUseCase.prototype.execute = function (event) {
        return event.message.startsWith(applicationMessagePrefix_1.applicationMessagePrefix)
            ? this.onApplicationEvent(event.player, event.message)
            : Promise.resolve();
    };
    PlayerMessageUseCase.prototype.onApplicationEvent = function (player, message) {
        var applicationEvent = this.applicationEventStrategies(message, player).get(true);
        return applicationEvent
            ? this.applicationServices.event.sentEvent(applicationEvent)
            : this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer_1.MessageForPlayer(player, (0, playerMessages_1.dontKnowWhatToDoWithThatMessage)(player)));
    };
    PlayerMessageUseCase.prototype.applicationEventStrategies = function (message, player) {
        return new Map([
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_APPLAUSE, new PlayerApplauseEvent_1.PlayerApplauseEvent()],
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_WHISTLE, new PlayerWhistleEvent_1.PlayerWhistleEvent()],
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_HYPERLIKE, new PlayerHyperLikeEvent_1.PlayerHyperLikeEvent()],
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_SHOOT, new PlayerShootEvent_1.PlayerShootEvent()],
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.RIGHT, new PlayerCleaveEvent_1.PlayerCleaveEvent(player, PlayerCleave_1.PlayerCleave.RIGHT)],
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.LEFT, new PlayerCleaveEvent_1.PlayerCleaveEvent(player, PlayerCleave_1.PlayerCleave.LEFT)],
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.HELP, new PlayerAskForHelpEvent_1.PlayerAskForHelpEvent(player)],
            [message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_HELP, new PlayerAskForHelpEvent_1.PlayerAskForHelpEvent(player)],
            [message.startsWith(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SUGGEST_CLEAVAGE), new PlayerSuggestCleavageEvent_1.PlayerSuggestCleavageEvent(player, this.newCleavageFromMessage(message))]
        ]);
    };
    PlayerMessageUseCase.prototype.newCleavageFromMessage = function (message) {
        return new Cleavage_1.Cleavage({
            title: message.replace(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SUGGEST_CLEAVAGE, '').trimStart(),
            leftChoice: { name: 'Gôche', players: [] },
            rightChoice: { name: 'Drouate', players: [] },
            players: []
        });
    };
    return PlayerMessageUseCase;
}(UseCase_1.UseCase));
exports.PlayerMessageUseCase = PlayerMessageUseCase;
