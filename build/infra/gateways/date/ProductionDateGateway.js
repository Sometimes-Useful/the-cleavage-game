"use strict";
exports.__esModule = true;
exports.ProductionDateGateway = void 0;
var ProductionDateGateway = /** @class */ (function () {
    function ProductionDateGateway() {
    }
    ProductionDateGateway.prototype.retrieveCurrentDate = function () {
        return Promise.resolve(new Date());
    };
    return ProductionDateGateway;
}());
exports.ProductionDateGateway = ProductionDateGateway;
