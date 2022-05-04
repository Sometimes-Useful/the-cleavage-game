"use strict";
exports.__esModule = true;
exports.RetrieveRegisteredStreamerByUsernameUseCase = void 0;
var RetrieveRegisteredStreamerByUsernameUseCase = /** @class */ (function () {
    function RetrieveRegisteredStreamerByUsernameUseCase(applicationServices, username) {
        this.applicationServices = applicationServices;
        this.username = username;
    }
    RetrieveRegisteredStreamerByUsernameUseCase.prototype.execute = function () {
        return this.applicationServices.globalStreamers.registeredStreamerByUsername(this.username);
    };
    return RetrieveRegisteredStreamerByUsernameUseCase;
}());
exports.RetrieveRegisteredStreamerByUsernameUseCase = RetrieveRegisteredStreamerByUsernameUseCase;
