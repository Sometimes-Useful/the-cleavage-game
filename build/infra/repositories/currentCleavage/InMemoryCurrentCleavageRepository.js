"use strict";
exports.__esModule = true;
exports.InMemoryCurrentCleavageRepository = void 0;
var infra_1 = require("../../../messages/infra");
var InMemoryCurrentCleavageRepository = /** @class */ (function () {
    function InMemoryCurrentCleavageRepository() {
    }
    InMemoryCurrentCleavageRepository.prototype.hasCleavage = function () {
        return Promise.resolve(!!this.cleavage);
    };
    InMemoryCurrentCleavageRepository.prototype.load = function () {
        return this.cleavage
            ? Promise.resolve(this.cleavage)
            : Promise.reject(new Error(infra_1.cleavageUndefined));
    };
    InMemoryCurrentCleavageRepository.prototype.save = function (cleavage) {
        this.cleavage = cleavage;
        return Promise.resolve();
    };
    return InMemoryCurrentCleavageRepository;
}());
exports.InMemoryCurrentCleavageRepository = InMemoryCurrentCleavageRepository;
