"use strict";
exports.__esModule = true;
exports.RetrieveCleavageDrawpileQuantityUseCase = void 0;
var RetrieveCleavageDrawpileQuantityUseCase = /** @class */ (function () {
    function RetrieveCleavageDrawpileQuantityUseCase(applicationServices) {
        this.applicationServices = applicationServices;
    }
    RetrieveCleavageDrawpileQuantityUseCase.prototype.execute = function () {
        return this.applicationServices.globalCleavageDrawPile.retrieveCleavageDrawPileQuantity();
    };
    return RetrieveCleavageDrawpileQuantityUseCase;
}());
exports.RetrieveCleavageDrawpileQuantityUseCase = RetrieveCleavageDrawpileQuantityUseCase;
