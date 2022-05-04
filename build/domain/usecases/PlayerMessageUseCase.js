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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.PlayerMessageUseCase = void 0;
var applicationMessagePrefix_1 = require("../entities/applicationMessagePrefix");
var AuthorizedMessage_1 = require("../entities/AuthorizedMessage");
var Cleavage_1 = require("../entities/Cleavage");
var MessageForPlayer_1 = require("../entities/MessageForPlayer");
var PlayerCleave_1 = require("../entities/PlayerCleave");
var playerMessages_1 = require("../entities/playerMessages");
var PlayerApplauseEvent_1 = require("../events/playerApplause/PlayerApplauseEvent");
var PlayerAskForHelpEvent_1 = require("../events/playerAskForHelp/PlayerAskForHelpEvent");
var PlayerCleaveEvent_1 = require("../events/playerCleave/PlayerCleaveEvent");
var PlayerHyperLikeEvent_1 = require("../events/playerHyperLike/PlayerHyperLikeEvent");
var PlayerShootEvent_1 = require("../events/playerShoot/PlayerShootEvent");
var PlayerWhistleEvent_1 = require("../events/playerWhistle/PlayerWhistleEvent");
var PlayerSuggestCleavageEvent_1 = require("../events/suggestCleavage/PlayerSuggestCleavageEvent");
var UseCase_1 = require("./UseCase");
var PlayerMessageUseCase = /** @class */ (function (_super) {
    __extends(PlayerMessageUseCase, _super);
    function PlayerMessageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    PlayerMessageUseCase.prototype.execute = function (event) {
        return event.message.startsWith(applicationMessagePrefix_1.applicationMessagePrefix)
            ? this.onApplicationEvent(event.username, event.message)
            : Promise.resolve();
    };
    PlayerMessageUseCase.prototype.onApplicationEvent = function (username, message) {
        var _this = this;
        return this.applicationServices.cleavage.hasCurrentCleavage()
            .then(function (hasCurrentCleavage) { return hasCurrentCleavage ? _this.onCurrentCleavage(username, message) : _this.applyStrategies(username, _this.applicationEventStrategiesWithoutCurrentCleavage(username, message)); })["catch"](function (error) { return Promise.reject(error); });
    };
    PlayerMessageUseCase.prototype.onCurrentCleavage = function (username, message) {
        var _this = this;
        return this.applicationServices.cleavage.loadCurrentCleavage()
            .then(function (currentCleavage) {
            var e_1, _a, e_2, _b;
            var strategies = new Map();
            try {
                for (var _c = __values(_this.applicationEventStrategiesWithCurrentCleavage(username, message, currentCleavage).entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                    strategies.set(key, value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _f = __values(_this.applicationEventStrategiesWithoutCurrentCleavage(username, message).entries()), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var _h = __read(_g.value, 2), key = _h[0], value = _h[1];
                    strategies.set(key, value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f["return"])) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return _this.applyStrategies(username, strategies);
        });
    };
    PlayerMessageUseCase.prototype.applyStrategies = function (username, strategies) {
        var applicationEventOrMessage = strategies.get(true);
        return applicationEventOrMessage
            ? typeof applicationEventOrMessage === 'string'
                ? this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer_1.MessageForPlayer(username, applicationEventOrMessage))
                : this.applicationServices.event.sentEvent(applicationEventOrMessage)
            : this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer_1.MessageForPlayer(username, (0, playerMessages_1.dontKnowWhatToDoWithThatMessage)(username)));
    };
    PlayerMessageUseCase.prototype.applicationEventStrategiesWithCurrentCleavage = function (username, message, currentCleavage) {
        var strategies = new Map();
        strategies.set((applicationMessagePrefix_1.applicationMessagePrefix + currentCleavage.rightChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.RIGHT));
        strategies.set((applicationMessagePrefix_1.applicationMessagePrefix + currentCleavage.leftChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.LEFT));
        strategies.set((applicationMessagePrefix_1.applicationMessagePrefix + currentCleavage.leftChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()) && (applicationMessagePrefix_1.applicationMessagePrefix + currentCleavage.rightChoice.name.toLocaleLowerCase()).startsWith(message.toLocaleLowerCase()), (0, playerMessages_1.multipleCleaveOptionsAvailable)(currentCleavage));
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + currentCleavage.leftChoice.name, new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.LEFT));
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + currentCleavage.rightChoice.name, new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.RIGHT));
        return strategies;
    };
    PlayerMessageUseCase.prototype.applicationEventStrategiesWithoutCurrentCleavage = function (username, message) {
        var rightOption = 'droite';
        var leftOption = 'gauche';
        var leftNumber = '1';
        var rightNumber = '2';
        var strategies = new Map();
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_APPLAUSE, new PlayerApplauseEvent_1.PlayerApplauseEvent());
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_WHISTLE, new PlayerWhistleEvent_1.PlayerWhistleEvent());
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_HYPERLIKE, new PlayerHyperLikeEvent_1.PlayerHyperLikeEvent());
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_SHOOT, new PlayerShootEvent_1.PlayerShootEvent());
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.RIGHT, new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.RIGHT));
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.LEFT, new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.LEFT));
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.HELP, new PlayerAskForHelpEvent_1.PlayerAskForHelpEvent(username));
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SHORT_HELP, new PlayerAskForHelpEvent_1.PlayerAskForHelpEvent(username));
        strategies.set(message.startsWith(applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SUGGEST_CLEAVAGE), new PlayerSuggestCleavageEvent_1.PlayerSuggestCleavageEvent(username, this.newCleavageFromMessage(message)));
        strategies.set(message.replace(' ', '') === applicationMessagePrefix_1.applicationMessagePrefix + AuthorizedMessage_1.AuthorizedMessage.SUGGEST_CLEAVAGE, playerMessages_1.missingTitleMessage);
        strategies.set((applicationMessagePrefix_1.applicationMessagePrefix + leftOption).toLocaleLowerCase().startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.LEFT));
        strategies.set((applicationMessagePrefix_1.applicationMessagePrefix + rightOption).toLocaleLowerCase().startsWith(message.toLocaleLowerCase()), new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.RIGHT));
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + leftNumber, new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.LEFT));
        strategies.set(message === applicationMessagePrefix_1.applicationMessagePrefix + rightNumber, new PlayerCleaveEvent_1.PlayerCleaveEvent(username, PlayerCleave_1.PlayerCleave.RIGHT));
        return strategies;
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
