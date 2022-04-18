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
exports.PlayerAskForHelpEvent = void 0;
var GameEvent_1 = require("../GameEvent");
var EventType_1 = require("../EventType");
var PlayerAskForHelpEvent = /** @class */ (function (_super) {
    __extends(PlayerAskForHelpEvent, _super);
    function PlayerAskForHelpEvent(player) {
        var _this = _super.call(this) || this;
        _this.player = player;
        _this.eventType = EventType_1.EventType.PLAYER_ASK_FOR_HELP;
        return _this;
    }
    return PlayerAskForHelpEvent;
}(GameEvent_1.ApplicationEvent));
exports.PlayerAskForHelpEvent = PlayerAskForHelpEvent;
