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
exports.PlayerHyperLikeEvent = void 0;
var GameEvent_1 = require("../GameEvent");
var EventType_1 = require("../EventType");
var PlayerHyperLikeEvent = /** @class */ (function (_super) {
    __extends(PlayerHyperLikeEvent, _super);
    function PlayerHyperLikeEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventType = EventType_1.EventType.PLAYER_HYPERLIKE;
        return _this;
    }
    return PlayerHyperLikeEvent;
}(GameEvent_1.ApplicationEvent));
exports.PlayerHyperLikeEvent = PlayerHyperLikeEvent;
