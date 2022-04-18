"use strict";
exports.__esModule = true;
exports.FakeRandomGateway = void 0;
var FakeRandomGateway = /** @class */ (function () {
    function FakeRandomGateway() {
        this.predictiveNumber = 1;
    }
    FakeRandomGateway.prototype.randomIntegerOnRange = function (startingNumber, endingNumber) {
        return Promise.resolve(this.predictiveNumber);
    };
    return FakeRandomGateway;
}());
exports.FakeRandomGateway = FakeRandomGateway;
