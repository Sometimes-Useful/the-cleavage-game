"use strict";
exports.__esModule = true;
exports.InMemoryVideoExtractRepository = void 0;
var InMemoryVideoExtractRepository = /** @class */ (function () {
    function InMemoryVideoExtractRepository() {
        this.videoExtracts = [];
        this.equalityVideoChoice = 'equality';
    }
    InMemoryVideoExtractRepository.prototype.retreiveEqualityVideoExtracts = function () {
        var _this = this;
        return Promise.resolve(this.videoExtracts.filter(function (videoExtract) { return videoExtract.choice === _this.equalityVideoChoice; }));
    };
    InMemoryVideoExtractRepository.prototype.retreiveVideoExtractsByChoice = function (majorChoice) {
        return Promise.resolve(this.videoExtracts.filter(function (videoExtract) { return videoExtract.choice === majorChoice; }));
    };
    InMemoryVideoExtractRepository.prototype.hasVideoExtract = function (choice) {
        return Promise.resolve(this.videoExtracts.some(function (videoExtract) { return videoExtract.choice === choice; }));
    };
    InMemoryVideoExtractRepository.prototype.hasEqualityVideoExtract = function () {
        var _this = this;
        return Promise.resolve(this.videoExtracts.some(function (videoExtract) { return videoExtract.choice === _this.equalityVideoChoice; }));
    };
    return InMemoryVideoExtractRepository;
}());
exports.InMemoryVideoExtractRepository = InMemoryVideoExtractRepository;
