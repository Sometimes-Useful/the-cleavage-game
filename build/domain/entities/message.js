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
exports.WelcomeMessage = exports.Message = void 0;
var Message = /** @class */ (function () {
    function Message(message) {
        this.message = message;
    }
    return Message;
}());
exports.Message = Message;
var WelcomeMessage = /** @class */ (function (_super) {
    __extends(WelcomeMessage, _super);
    function WelcomeMessage() {
        return _super.call(this, welcomeMessage) || this;
    }
    return WelcomeMessage;
}(Message));
exports.WelcomeMessage = WelcomeMessage;
var welcomeMessage = "La r\u00E9gie du jeu du clivage est chaud patate!\nPour obtenir de l'aide, lancer la commande '!h'";
