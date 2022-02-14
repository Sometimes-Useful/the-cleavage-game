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
exports.LaunchCleavageEvent = void 0;
var GameEvent_1 = require("../GameEvent");
var EventType_1 = require("../EventType");
var LaunchCleavageEvent = /** @class */ (function (_super) {
    __extends(LaunchCleavageEvent, _super);
    function LaunchCleavageEvent(cleavageTitle, leftChoiceName, rightChoiceName) {
        var _this = _super.call(this) || this;
        _this.cleavageTitle = cleavageTitle;
        _this.leftChoiceName = leftChoiceName;
        _this.rightChoiceName = rightChoiceName;
        _this.eventType = EventType_1.EventType.LAUNCH_CLEAVAGE;
        return _this;
    }
    return LaunchCleavageEvent;
}(GameEvent_1.ApplicationEvent));
exports.LaunchCleavageEvent = LaunchCleavageEvent;
