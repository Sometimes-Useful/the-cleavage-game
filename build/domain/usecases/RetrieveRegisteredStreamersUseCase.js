"use strict";
exports.__esModule = true;
exports.RetrieveRegisteredStreamersUseCase = void 0;
var RetrieveRegisteredStreamersUseCase = /** @class */ (function () {
    function RetrieveRegisteredStreamersUseCase(applicationServices) {
        this.applicationServices = applicationServices;
    }
    RetrieveRegisteredStreamersUseCase.prototype.execute = function () {
        return this.applicationServices.globalStreamers.registeredStreamers();
    };
    return RetrieveRegisteredStreamersUseCase;
}());
exports.RetrieveRegisteredStreamersUseCase = RetrieveRegisteredStreamersUseCase;
