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
exports.VideoExtractApplicationService = void 0;
var VideoExtractApplicationService = /** @class */ (function () {
    function VideoExtractApplicationService(videoExtractRepository, interfaceGateway, randomGateway) {
        this.videoExtractRepository = videoExtractRepository;
        this.interfaceGateway = interfaceGateway;
        this.randomGateway = randomGateway;
    }
    VideoExtractApplicationService.prototype.removeVideoExtractOnInterface = function () {
        return Promise.all([
            this.interfaceGateway.changeVideoExtract(undefined),
            this.interfaceGateway.unMuteMusic()
        ])
            .then(function () { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    VideoExtractApplicationService.prototype.applyVideoExtractOnInterface = function (cleavage) {
        var majorChoice = cleavage.majorChoice();
        return majorChoice
            ? this.onMajorChoice(majorChoice, cleavage)
            : this.onNoMajorChoice();
    };
    VideoExtractApplicationService.prototype.onMajorChoice = function (majorChoice, cleavage) {
        var _this = this;
        return this.videoExtractRepository.retreiveVideoExtractsByChoice(majorChoice)
            .then(function (videoExtracts) {
            var videoExtract = videoExtracts.reduce(function (a, b) { return Math.abs(b.percentage - cleavage.majorScore()) < Math.abs(a.percentage - cleavage.majorScore()) ? b : a; });
            console.log(JSON.stringify(cleavage));
            console.log(JSON.stringify(videoExtract));
            return _this.playVideo(videoExtract);
        });
    };
    VideoExtractApplicationService.prototype.playVideo = function (videoExtract) {
        Promise.all([
            this.interfaceGateway.changeVideoExtract(videoExtract),
            this.interfaceGateway.muteMusic()
        ])
            .then(function () { return Promise.resolve(); })["catch"](function (error) { return Promise.reject(error); });
    };
    VideoExtractApplicationService.prototype.onNoMajorChoice = function () {
        var _this = this;
        return this.videoExtractRepository.retreiveEqualityVideoExtracts()
            .then(function (videoExtracts) { return Promise.all([videoExtracts, _this.randomGateway.randomIntegerOnRange(1, videoExtracts.length)]); })
            .then(function (_a) {
            var _b = __read(_a, 2), videoExtracts = _b[0], random = _b[1];
            return _this.playVideo(videoExtracts[random - 1]);
        })["catch"](function (error) { return Promise.reject(error); });
    };
    VideoExtractApplicationService.prototype.hasVideoExtractForChoice = function (choice) {
        return choice
            ? this.videoExtractRepository.hasVideoExtract(choice)
            : this.videoExtractRepository.hasEqualityVideoExtract();
    };
    return VideoExtractApplicationService;
}());
exports.VideoExtractApplicationService = VideoExtractApplicationService;
