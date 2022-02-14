"use strict";
exports.__esModule = true;
exports.ProductionRandomGateway = void 0;
var ProductionRandomGateway = /** @class */ (function () {
    function ProductionRandomGateway() {
    }
    ProductionRandomGateway.prototype.randomIntegerOnRange = function (startingNumber, endingNumber) {
        startingNumber = Math.ceil(startingNumber);
        endingNumber = Math.floor(endingNumber);
        return Promise.resolve(Math.floor(Math.random() * (endingNumber - startingNumber + 1)) + startingNumber);
    };
    return ProductionRandomGateway;
}());
exports.ProductionRandomGateway = ProductionRandomGateway;
