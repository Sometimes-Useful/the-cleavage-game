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
exports.ConnectChatUseCase = void 0;
var UseCase_1 = require("./UseCase");
var notifications_1 = require("../entities/notification/notifications");
var mainMusic_1 = require("../entities/music/mainMusic");
var message_1 = require("../entities/message");
var CreateBarEvent_1 = require("../events/createBar/CreateBarEvent");
var ConnectChatUseCase = /** @class */ (function (_super) {
    __extends(ConnectChatUseCase, _super);
    function ConnectChatUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    ConnectChatUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.chat.isConnected()
            .then(function (isConnected) { return !isConnected
            ? _this.onDisconnected(event)
            : _this.applicationServices.interface.notify(notifications_1.alreadyConnectedToChatNotification); })["catch"](function (error) { return Promise.reject(error); });
    };
    ConnectChatUseCase.prototype.onDisconnected = function (event) {
        var _this = this;
        return this.applicationServices.chat.connectChat(event.username, event.token, event.channel)
            .then(function () { return _this.onConnected(); })["catch"](function (error) { return Promise.reject(error); });
    };
    ConnectChatUseCase.prototype.onConnected = function () {
        return Promise.all([
            this.applicationServices.event.sentEvent(new CreateBarEvent_1.CreateBarEvent()),
            this.applicationServices.chat.sendMessage(new message_1.WelcomeMessage()),
            this.applicationServices.interface.playMusic(mainMusic_1.mainMusic)
        ])
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    return ConnectChatUseCase;
}(UseCase_1.UseCase));
exports.ConnectChatUseCase = ConnectChatUseCase;
