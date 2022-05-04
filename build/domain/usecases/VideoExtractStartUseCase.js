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
exports.VideoExtractStartUseCase = void 0;
var GamePhase_1 = require("../entities/GamePhase");
var ChangeGamePhaseEvent_1 = require("../events/changeGamePhase/ChangeGamePhaseEvent");
var DrawCleavageEvent_1 = require("../events/drawCleavage/DrawCleavageEvent");
var UseCase_1 = require("./UseCase");
var VideoExtractStartUseCase = /** @class */ (function (_super) {
    __extends(VideoExtractStartUseCase, _super);
    function VideoExtractStartUseCase(applicationServices) {
        var _this = _super.call(this) || this;
        _this.applicationServices = applicationServices;
        return _this;
    }
    VideoExtractStartUseCase.prototype.execute = function (event) {
        var _this = this;
        return this.applicationServices.cleavage.hasCurrentCleavage()
            .then(function (hasCleavage) { return hasCleavage ? _this.onCleavage() : _this.withoutCleavage(); });
    };
    VideoExtractStartUseCase.prototype.onCleavage = function () {
        var _this = this;
        return this.applicationServices.cleavage.loadCurrentCleavage()
            .then(function (cleavage) { return Promise.all([
            _this.applicationServices.autoplay.hasAutoplay(),
            _this.applicationServices.videoExtract.hasVideoExtractForChoice(cleavage.majorChoice()),
            cleavage
        ]); })
            .then(function (_a) {
            var _b = __read(_a, 3), isAutoplay = _b[0], hasVideoExtract = _b[1], cleavage = _b[2];
            return hasVideoExtract
                ? _this.onVideoExtract(cleavage, isAutoplay, hasVideoExtract)
                : _this.sendNextEvents(isAutoplay, hasVideoExtract);
        })["catch"](function (error) { return Promise.reject(error); });
    };
    VideoExtractStartUseCase.prototype.onVideoExtract = function (cleavage, isAutoplay, hasVideoExtract) {
        var _this = this;
        return this.applicationServices.videoExtract.applyVideoExtractOnInterface(cleavage)
            .then(function () { return _this.sendNextEvents(isAutoplay, hasVideoExtract); })["catch"](function (error) { return Promise.reject(error); });
    };
    VideoExtractStartUseCase.prototype.withoutCleavage = function () {
        var _this = this;
        return this.applicationServices.autoplay.hasAutoplay()
            .then(function (isAutoplay) { return _this.sendNextEvents(isAutoplay, false); })["catch"](function (error) { return Promise.reject(error); });
    };
    VideoExtractStartUseCase.prototype.sendNextEvents = function (isAutoplay, hasVideoExtract) {
        return this.applicationServices.event.sentEvents(__spreadArray([
            new ChangeGamePhaseEvent_1.ChangeGamePhaseEvent(hasVideoExtract ? GamePhase_1.GamePhase.PLAY_VIDEO : GamePhase_1.GamePhase.NEW_CLEAVAGE)
        ], __read(isAutoplay && !hasVideoExtract ? [new DrawCleavageEvent_1.DrawCleavageEvent()] : []), false))["catch"](function (error) { return Promise.reject(error); });
    };
    return VideoExtractStartUseCase;
}(UseCase_1.UseCase));
exports.VideoExtractStartUseCase = VideoExtractStartUseCase;
