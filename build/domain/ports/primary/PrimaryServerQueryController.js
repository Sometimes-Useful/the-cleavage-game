"use strict";
exports.__esModule = true;
exports.PrimaryServerQueryController = void 0;
var DrawGlobalCleavageDrawPileUseCase_1 = require("../../usecases/DrawGlobalCleavageDrawPileUseCase");
var PrimaryServerQueryController = /** @class */ (function () {
    function PrimaryServerQueryController(applicationServices) {
        this.applicationServices = applicationServices;
    }
    PrimaryServerQueryController.prototype.drawGlobalCleavageDrawPile = function () {
        return new DrawGlobalCleavageDrawPileUseCase_1.DrawGlobalCleavageDrawPileUseCase(this.applicationServices).execute();
    };
    return PrimaryServerQueryController;
}());
exports.PrimaryServerQueryController = PrimaryServerQueryController;
