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
exports.SuggestCleavageUseCase = void 0;
var MessageForPlayer_1 = require("../entities/MessageForPlayer");
var playerMessages_1 = require("../entities/playerMessages");
var UseCase_1 = require("./UseCase");
var SuggestCleavageUseCase = /** @class */ (function (_super) {
    __extends(SuggestCleavageUseCase, _super);
    function SuggestCleavageUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    SuggestCleavageUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.cleavage.isPublicCleavageExist(event.cleavage)
            .then(function (isPublicCleavageExist) { return isPublicCleavageExist
            ? _this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer_1.MessageForPlayer(event.username, playerMessages_1.cleavageAlreadySuggested))
            : _this.onPublicCleavageExist(event); })["catch"](function (error) { return Promise.reject(error); });
    };
    SuggestCleavageUseCase.prototype.onPublicCleavageExist = function (event) {
        var _this = this;
        return this.applicationServices.cleavage.addPublicCleavage(event.cleavage)
            .then(function () { return _this.applicationServices.chat.sendMessageToPlayer(new MessageForPlayer_1.MessageForPlayer(event.username, (0, playerMessages_1.cleavageSuggested)(event.username, event.cleavage.title))); })["catch"](function (error) { return Promise.reject(error); });
    };
    return SuggestCleavageUseCase;
}(UseCase_1.UseCase));
exports.SuggestCleavageUseCase = SuggestCleavageUseCase;
