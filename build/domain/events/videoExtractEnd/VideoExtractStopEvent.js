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
exports.VideoExtractStopEvent = void 0;
var EventType_1 = require("../EventType");
var GameEvent_1 = require("../GameEvent");
var VideoExtractStopEvent = /** @class */ (function (_super) {
    __extends(VideoExtractStopEvent, _super);
    function VideoExtractStopEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventType = EventType_1.EventType.VIDEO_EXTRACT_STOP;
        return _this;
    }
    return VideoExtractStopEvent;
}(GameEvent_1.ApplicationEvent));
exports.VideoExtractStopEvent = VideoExtractStopEvent;
