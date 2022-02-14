"use strict";
exports.__esModule = true;
exports.InMemoryPublicCleavageDrawPileRepository = void 0;
var InMemoryPublicCleavageDrawPileRepository = /** @class */ (function () {
    function InMemoryPublicCleavageDrawPileRepository() {
        this.publicCleavages = [];
    }
    InMemoryPublicCleavageDrawPileRepository.prototype.isCleavageExistByTitle = function (cleavage) {
        return Promise.resolve(this.publicCleavages.some(function (publicCleavage) { return publicCleavage.title === cleavage.title; }));
    };
    InMemoryPublicCleavageDrawPileRepository.prototype.addCleavage = function (cleavage) {
        this.publicCleavages.push(cleavage);
        return Promise.resolve();
    };
    InMemoryPublicCleavageDrawPileRepository.prototype.nextCleavage = function () {
        return Promise.resolve(this.publicCleavages.shift());
    };
    return InMemoryPublicCleavageDrawPileRepository;
}());
exports.InMemoryPublicCleavageDrawPileRepository = InMemoryPublicCleavageDrawPileRepository;
