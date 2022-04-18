"use strict";
exports.__esModule = true;
exports.ChatApplicationService = void 0;
var notifications_1 = require("../entities/notification/notifications");
var ChatApplicationService = /** @class */ (function () {
    function ChatApplicationService(chatGateway, interfaceGateway) {
        this.chatGateway = chatGateway;
        this.interfaceGateway = interfaceGateway;
    }
    ChatApplicationService.prototype.sendMessageToPlayer = function (messageForPlayer) {
        return this.chatGateway.sendMessageToPlayer(messageForPlayer);
    };
    ChatApplicationService.prototype.sendMessage = function (message) {
        return this.chatGateway.sendMessage(message);
    };
    ChatApplicationService.prototype.isConnected = function () {
        return this.chatGateway.isConnected();
    };
    ChatApplicationService.prototype.connectChat = function (username, token, channel) {
        return this.chatGateway.connect(username, token, channel);
    };
    ChatApplicationService.prototype.disconnectChat = function () {
        var _this = this;
        return this.isConnected()
            .then(function (isConnected) { return isConnected ? _this.chatGateway.disconnect() : _this.interfaceGateway.notify(notifications_1.alreadyDisconnectedToChatNotification); });
    };
    return ChatApplicationService;
}());
exports.ChatApplicationService = ChatApplicationService;
