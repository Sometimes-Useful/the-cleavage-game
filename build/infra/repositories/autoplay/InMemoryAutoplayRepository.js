"use strict";
exports.__esModule = true;
exports.InMemoryAutoplayRepository = void 0;
var infra_1 = require("../../../messages/infra");
var InMemoryAutoplayRepository = /** @class */ (function () {
    function InMemoryAutoplayRepository() {
        this.autoplayInterval = 0;
    }
    InMemoryAutoplayRepository.prototype.configureNextAutoPlay = function (date) {
        this.nextCleavageDate = date || undefined;
        return Promise.resolve();
    };
    InMemoryAutoplayRepository.prototype.configureAutoplayInterval = function (autoplayMinutes) {
        this.autoplayInterval = autoplayMinutes;
        return Promise.resolve();
    };
    InMemoryAutoplayRepository.prototype.retreiveAutoplayInterval = function () {
        return Promise.resolve(this.autoplayInterval);
    };
    InMemoryAutoplayRepository.prototype.retrieveNextAutoPlayDate = function () {
        return this.nextCleavageDate
            ? Promise.resolve(this.nextCleavageDate)
            : Promise.reject(new Error(infra_1.nexAutoplayDateIsUndefined));
    };
    InMemoryAutoplayRepository.prototype.hasAutoplay = function () {
        return Promise.resolve(this.nextCleavageDate !== undefined);
    };
    return InMemoryAutoplayRepository;
}());
exports.InMemoryAutoplayRepository = InMemoryAutoplayRepository;
