"use strict";
exports.__esModule = true;
exports.FakeChatGateway = void 0;
var ChatStatus_1 = require("../../../domain/entities/ChatStatus");
var FakeChatGateway = /** @class */ (function () {
    function FakeChatGateway() {
        this.messagesForPlayer = [];
        this.messages = [];
        this.status = ChatStatus_1.ChatStatus.DISCONNECTED;
    }
    FakeChatGateway.prototype.sendMessage = function (message) {
        this.messages.push(message);
        return Promise.resolve();
    };
    FakeChatGateway.prototype.isConnected = function () {
        return Promise.resolve(this.status === ChatStatus_1.ChatStatus.CONNECTED);
    };
    FakeChatGateway.prototype.sendMessageToPlayer = function (messageForPlayer) {
        this.messagesForPlayer.push(messageForPlayer);
        return Promise.resolve();
    };
    FakeChatGateway.prototype.disconnect = function () {
        this.status = ChatStatus_1.ChatStatus.DISCONNECTED;
        return Promise.resolve();
    };
    FakeChatGateway.prototype.connect = function () {
        this.status = ChatStatus_1.ChatStatus.CONNECTED;
        return Promise.resolve();
    };
    return FakeChatGateway;
}());
exports.FakeChatGateway = FakeChatGateway;
