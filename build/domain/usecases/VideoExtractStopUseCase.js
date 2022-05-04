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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.VideoExtractStopUseCase = void 0;
var GamePhase_1 = require("../entities/GamePhase");
var ChangeGamePhaseEvent_1 = require("../events/changeGamePhase/ChangeGamePhaseEvent");
var DrawCleavageEvent_1 = require("../events/drawCleavage/DrawCleavageEvent");
var UseCase_1 = require("./UseCase");
var VideoExtractStopUseCase = /** @class */ (function (_super) {
    __extends(VideoExtractStopUseCase, _super);
    function VideoExtractStopUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    VideoExtractStopUseCase.prototype.execute = function (event) {
        var _this = this;
        return Promise.all([
            this.applicationServices.videoExtract.removeVideoExtractOnInterface()
        ])
            .then(function () { return _this.applicationServices.autoplay.hasAutoplay(); })
            .then(function (hasAutoplay) { return _this.applicationServices.event.sentEvents(__spreadArray([
            new ChangeGamePhaseEvent_1.ChangeGamePhaseEvent(GamePhase_1.GamePhase.NEW_CLEAVAGE)
        ], __read(hasAutoplay ? [new DrawCleavageEvent_1.DrawCleavageEvent()] : []), false)); });
    };
    return VideoExtractStopUseCase;
}(UseCase_1.UseCase));
exports.VideoExtractStopUseCase = VideoExtractStopUseCase;
