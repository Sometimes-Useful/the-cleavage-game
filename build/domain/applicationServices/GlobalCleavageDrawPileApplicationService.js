"use strict";
exports.__esModule = true;
exports.GlobalCleavageDrawPileApplicationService = void 0;
var GlobalCleavageDrawPileApplicationService = /** @class */ (function () {
    function GlobalCleavageDrawPileApplicationService(globalCleavageDrawPileRepository, randomGateway) {
        this.globalCleavageDrawPileRepository = globalCleavageDrawPileRepository;
        this.randomGateway = randomGateway;
    }
    GlobalCleavageDrawPileApplicationService.prototype.save = function (cleavage) {
        var _this = this;
        return this.globalCleavageDrawPileRepository.hasCleavage(cleavage)
            .then(function (hasCleavage) { return hasCleavage
            ? Promise.resolve()
            : _this.globalCleavageDrawPileRepository.save(cleavage); })["catch"](function (error) { return Promise.reject(error); });
    };
    GlobalCleavageDrawPileApplicationService.prototype.draw = function () {
        var _this = this;
        return this.globalCleavageDrawPileRepository.globalCleavageQuantity()
            .then(function (globalCleavageQuantity) { return globalCleavageQuantity === 0
            ? Promise.resolve(undefined)
            : _this.onGlobalCleavage(globalCleavageQuantity); })["catch"](function (error) { return Promise.reject(error); });
    };
    GlobalCleavageDrawPileApplicationService.prototype.onGlobalCleavage = function (globalCleavageQuantity) {
        var _this = this;
        return this.randomGateway.randomIntegerOnRange(1, globalCleavageQuantity)
            .then(function (cleavagePosition) { return _this.globalCleavageDrawPileRepository.retrieveGlobalCleavageByIndex(cleavagePosition - 1); })["catch"](function (error) { return Promise.reject(error); });
    };
    return GlobalCleavageDrawPileApplicationService;
}());
exports.GlobalCleavageDrawPileApplicationService = GlobalCleavageDrawPileApplicationService;
