"use strict";
exports.__esModule = true;
exports.formatTwitchUserMessage = exports.TwitchChatGateway = void 0;
var tmi_js_1 = require("tmi.js");
var PlayerMessageEvent_1 = require("../../../domain/events/playerMessage/PlayerMessageEvent");
var MessageForPlayer_1 = require("../../../domain/entities/MessageForPlayer");
var PlayerQuitEvent_1 = require("../../../domain/events/playerQuit/PlayerQuitEvent");
var Player_1 = require("../../../domain/entities/Player");
var noTwitchClientSet = 'No Twitch Client Set';
var TwitchChatGateway = /** @class */ (function () {
    function TwitchChatGateway(eventBus, twitchClientDebug) {
        if (twitchClientDebug === void 0) { twitchClientDebug = false; }
        this.eventBus = eventBus;
        this.twitchClientDebug = twitchClientDebug;
        this.isClientConnected = false;
        this.tmiClient = null;
        this.channel = null;
    }
    TwitchChatGateway.prototype.sendMessage = function (message) {
        if (this.tmiClient === null)
            return Promise.reject(new Error(noTwitchClientSet));
        return !this.channel
            ? Promise.reject(new Error(channelUndefinedErrorMessage(message.message)))
            : !this.isClientConnected
                ? Promise.reject(new Error(twitchClientNotConnectedErrorMessage))
                : this.sendTmiMessage(this.tmiClient, this.channel, message);
    };
    TwitchChatGateway.prototype.connect = function (username, password, channel) {
        var _this = this;
        var options = {
            identity: { username: username, password: password },
            options: {
                debug: this.twitchClientDebug
            }
        };
        var tmiClient = new tmi_js_1.Client(options);
        this.tmiClient = tmiClient;
        this.clientEvents();
        return this.tmiClient.connect()
            .then(function (_a) {
            var host = _a[0], port = _a[1];
            _this.isClientConnected = true;
            return tmiClient.join(channel);
        })
            .then(function (result) {
            console.log('channel join - promise resolved');
            _this.channel = channel;
        })["catch"](function (error) { return Promise.reject(error); });
    };
    TwitchChatGateway.prototype.sendMessageToPlayer = function (messageForPlayer) {
        if (this.tmiClient === null)
            return Promise.reject(new Error(noTwitchClientSet));
        return !this.channel
            ? Promise.reject(new Error(channelUndefinedErrorMessage(messageForPlayer.message)))
            : !this.isClientConnected
                ? Promise.reject(new Error(twitchClientNotConnectedErrorMessage))
                : this.sendTmiMessage(this.tmiClient, this.channel, messageForPlayer);
    };
    TwitchChatGateway.prototype.sendTmiMessage = function (tmiClient, channel, message) {
        var messages = message.message.split('\n');
        if (message instanceof MessageForPlayer_1.MessageForPlayer)
            messages[0] = (0, exports.formatTwitchUserMessage)(new MessageForPlayer_1.MessageForPlayer(message.player, messages[0]));
        return Promise.all(messages.map(function (message) { return tmiClient.say(channel, message); }))
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    TwitchChatGateway.prototype.disconnect = function () {
        var _this = this;
        if (this.tmiClient === null)
            return Promise.reject(new Error(noTwitchClientSet));
        return !this.channel
            ? Promise.reject(new Error(channelUndefinedErrorMessage('')))
            : !this.isClientConnected
                ? Promise.reject(new Error(twitchClientNotConnectedErrorMessage))
                : this.tmiClient.part(this.channel)
                    .then(function (channel) {
                    console.info(twitchClientDisconnecting);
                    return _this.tmiClient === null
                        ? Promise.reject(new Error(noTwitchClientSet))
                        : _this.tmiClient.disconnect();
                })
                    .then(function (_a) {
                    var host = _a[0], port = _a[1];
                    console.log(twitchClientDisconnect, 'host :', host, 'port :', port);
                    _this.isClientConnected = false;
                    _this.tmiClient = null;
                    _this.channel = null;
                    return Promise.resolve();
                })["catch"](function (error) { return Promise.reject(error); });
    };
    TwitchChatGateway.prototype.isConnected = function () {
        return Promise.resolve(this.isClientConnected);
    };
    TwitchChatGateway.prototype.clientEvents = function () {
        var _this = this;
        if (this.tmiClient === null)
            throw new Error(noTwitchClientSet);
        this.tmiClient.on('join', function (channel, username, self) {
            console.log(twitchClientJoinChannelAsUser(channel, username));
        });
        this.tmiClient.on('part', function (channel, username, self) {
            console.log(twitchClientLeaveChannelAsUser(channel, username));
            _this.eventBus.sendEvent(new PlayerQuitEvent_1.PlayerQuitEvent(new Player_1.Player({ username: username })));
        });
        this.tmiClient.on('connected', function (host, port) {
            console.log(twitchClientConnected(host, port));
        });
        this.tmiClient.on('connecting', function (host, port) {
            console.log(twitchClientConnecting(host, port));
        });
        this.tmiClient.on('disconnected', function (reason) {
            console.log(twitchClientDisconnect, 'Reason :', reason);
        });
        this.tmiClient.on('message', function (channel, userstate, message, self) {
            console.log(twitchClientMessage, { channel: channel, userstate: userstate, message: message });
            if (userstate.username)
                _this.sendPlayerMessageEventOnEventBus(new PlayerMessageEvent_1.PlayerMessageEvent(new Player_1.Player({ username: userstate.username }), message));
        });
    };
    TwitchChatGateway.prototype.sendPlayerMessageEventOnEventBus = function (playerMessageEvent) {
        this.eventBus.sendEvent(playerMessageEvent);
    };
    return TwitchChatGateway;
}());
exports.TwitchChatGateway = TwitchChatGateway;
var channelUndefinedErrorMessage = function (message) { return "Channel is undefined. Can't send player message: ".concat(message); };
var twitchClientConnecting = function (host, port) { return "Twitch client connecting on ".concat(host, ":").concat(port, " ..."); };
var twitchClientNotConnectedErrorMessage = 'Client not connected.';
var twitchClientConnected = function (host, port) { return "Twitch client connected on ".concat(host, ":").concat(port, "."); };
var twitchClientMessage = 'Twitch client message';
var twitchClientDisconnecting = 'Twitch client disconnecting ...';
var twitchClientDisconnect = 'Twitch client disconnected.';
var formatTwitchUserMessage = function (messageForPlayer) { return "@".concat(messageForPlayer.player.username, " >>> ").concat(messageForPlayer.message); };
exports.formatTwitchUserMessage = formatTwitchUserMessage;
var twitchClientJoinChannelAsUser = function (channel, username) { return "".concat(username, " joint channel '").concat(channel, "'."); };
var twitchClientLeaveChannelAsUser = function (channel, username) { return "".concat(username, " leave channel '").concat(channel, "'."); };
