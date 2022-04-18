"use strict";
exports.__esModule = true;
exports.DrawGlobalCleavageDrawPileUseCase = void 0;
var DrawGlobalCleavageDrawPileUseCase = /** @class */ (function () {
    function DrawGlobalCleavageDrawPileUseCase(applicationServices) {
        this.applicationServices = applicationServices;
    }
    DrawGlobalCleavageDrawPileUseCase.prototype.execute = function () {
        return this.applicationServices.globalCleavageDrawPile.draw();
    };
    return DrawGlobalCleavageDrawPileUseCase;
}());
exports.DrawGlobalCleavageDrawPileUseCase = DrawGlobalCleavageDrawPileUseCase;
