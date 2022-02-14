"use strict";
exports.__esModule = true;
exports.InMemoryCurrentCleavageRepository = void 0;
var InMemoryCurrentCleavageRepository = /** @class */ (function () {
    function InMemoryCurrentCleavageRepository() {
    }
    InMemoryCurrentCleavageRepository.prototype.hasCleavage = function () {
        return Promise.resolve(!!this.cleavage);
    };
    InMemoryCurrentCleavageRepository.prototype.load = function () {
        return this.cleavage
            ? Promise.resolve(this.cleavage)
            : Promise.reject(new Error('Cleavage is undefined.'));
    };
    InMemoryCurrentCleavageRepository.prototype.save = function (cleavage) {
        this.cleavage = cleavage;
        return Promise.resolve();
    };
    return InMemoryCurrentCleavageRepository;
}());
exports.InMemoryCurrentCleavageRepository = InMemoryCurrentCleavageRepository;
