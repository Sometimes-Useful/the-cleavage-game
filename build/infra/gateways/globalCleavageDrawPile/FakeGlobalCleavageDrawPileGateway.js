"use strict";
exports.__esModule = true;
exports.FakeGlobalCleavageDrawPileGateway = void 0;
var FakeGlobalCleavageDrawPileGateway = /** @class */ (function () {
    function FakeGlobalCleavageDrawPileGateway() {
        this.globalCleavageDrawPile = [];
    }
    FakeGlobalCleavageDrawPileGateway.prototype.retrieveCleavageDrawpileQuantity = function () {
        return Promise.resolve(this.globalCleavageDrawPile.length);
    };
    FakeGlobalCleavageDrawPileGateway.prototype.drawGlobalCleavage = function () {
        return Promise.resolve(this.globalCleavageDrawPile[0]);
    };
    FakeGlobalCleavageDrawPileGateway.prototype.save = function (cleavage) {
        this.globalCleavageDrawPile.push(cleavage);
        return Promise.resolve();
    };
    return FakeGlobalCleavageDrawPileGateway;
}());
exports.FakeGlobalCleavageDrawPileGateway = FakeGlobalCleavageDrawPileGateway;
