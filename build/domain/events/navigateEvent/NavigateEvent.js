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
exports.NavigateEvent = void 0;
var EventType_1 = require("../EventType");
var GameEvent_1 = require("../GameEvent");
var NavigateEvent = /** @class */ (function (_super) {
    __extends(NavigateEvent, _super);
    function NavigateEvent(targetView) {
        var _this = _super.call(this) || this;
        _this.targetView = targetView;
        _this.eventType = EventType_1.EventType.NAVIGATE;
        return _this;
    }
    return NavigateEvent;
}(GameEvent_1.ApplicationEvent));
exports.NavigateEvent = NavigateEvent;
