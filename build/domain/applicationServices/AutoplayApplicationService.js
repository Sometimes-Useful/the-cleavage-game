"use strict";
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
exports.__esModule = true;
exports.AutoplayApplicationService = void 0;
var AutoplayApplicationService = /** @class */ (function () {
    function AutoplayApplicationService(autoplayRepository, dateGateway) {
        this.autoplayRepository = autoplayRepository;
        this.dateGateway = dateGateway;
    }
    AutoplayApplicationService.prototype.hasAutoplay = function () {
        return this.autoplayRepository.hasAutoplay();
    };
    AutoplayApplicationService.prototype.isTimeForNextCleavage = function () {
        return Promise.all([
            this.autoplayRepository.retrieveNextAutoPlayDate(),
            this.dateGateway.retrieveCurrentDate()
        ])
            .then(function (_a) {
            var _b = __read(_a, 2), nextAutoplayDate = _b[0], currentDate = _b[1];
            return Promise.resolve(currentDate >= nextAutoplayDate);
        })["catch"](function (error) { return Promise.reject(error); });
    };
    AutoplayApplicationService.prototype.configureNextAutoPlay = function (autoplayMinutes) {
        var _this = this;
        return autoplayMinutes === 0
            ? this.onDisableAutoplay(autoplayMinutes)
            : this.dateGateway.retrieveCurrentDate()
                .then(function (currentDate) { return autoplayMinutes
                ? _this.onAutoplayMinutes(currentDate, autoplayMinutes)
                : _this.onNoAutoplayMinutes(currentDate); })["catch"](function (error) { return Promise.reject(error); });
    };
    AutoplayApplicationService.prototype.onDisableAutoplay = function (autoplayMinutes) {
        return Promise.all([
            this.autoplayRepository.configureAutoplayInterval(autoplayMinutes),
            this.autoplayRepository.configureNextAutoPlay(null)
        ])
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    AutoplayApplicationService.prototype.onAutoplayMinutes = function (currentDate, autoplayMinutes) {
        return Promise.all([
            this.autoplayRepository.configureNextAutoPlay(this.addMinutes(new Date(currentDate), autoplayMinutes)),
            this.autoplayRepository.configureAutoplayInterval(autoplayMinutes)
        ])
            .then(function (results) { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    AutoplayApplicationService.prototype.onNoAutoplayMinutes = function (currentDate) {
        var _this = this;
        return this.autoplayRepository.retreiveAutoplayInterval()
            .then(function (autoplayInterval) { return _this.autoplayRepository.configureNextAutoPlay(_this.addMinutes(new Date(currentDate), autoplayInterval)); })["catch"](function (error) { return Promise.reject(error); });
    };
    AutoplayApplicationService.prototype.addMinutes = function (date, minutes) {
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    };
    return AutoplayApplicationService;
}());
exports.AutoplayApplicationService = AutoplayApplicationService;
