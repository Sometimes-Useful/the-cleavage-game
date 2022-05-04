"use strict";
exports.__esModule = true;
exports.PrimaryServerQueryController = void 0;
var DrawGlobalCleavageDrawPileUseCase_1 = require("../../usecases/DrawGlobalCleavageDrawPileUseCase");
var RetrieveCleavageDrawpileQuantityUseCase_1 = require("../../usecases/RetrieveCleavageDrawpileQuantityUseCase");
var RetrieveRegisteredStreamerByUsernameUseCase_1 = require("../../usecases/RetrieveRegisteredStreamerByUsernameUseCase");
var RetrieveRegisteredStreamersUseCase_1 = require("../../usecases/RetrieveRegisteredStreamersUseCase");
var PrimaryServerQueryController = /** @class */ (function () {
    function PrimaryServerQueryController(applicationServices) {
        this.applicationServices = applicationServices;
    }
    PrimaryServerQueryController.prototype.retrieveAllRegisteredStreamers = function () {
        return new RetrieveRegisteredStreamersUseCase_1.RetrieveRegisteredStreamersUseCase(this.applicationServices).execute();
    };
    PrimaryServerQueryController.prototype.drawGlobalCleavageDrawPile = function () {
        return new DrawGlobalCleavageDrawPileUseCase_1.DrawGlobalCleavageDrawPileUseCase(this.applicationServices).execute();
    };
    PrimaryServerQueryController.prototype.retrieveCleavageDrawpileQuantity = function () {
        return new RetrieveCleavageDrawpileQuantityUseCase_1.RetrieveCleavageDrawpileQuantityUseCase(this.applicationServices).execute();
    };
    PrimaryServerQueryController.prototype.retrieveRegisteredStreamerByUsername = function (username) {
        return new RetrieveRegisteredStreamerByUsernameUseCase_1.RetrieveRegisteredStreamerByUsernameUseCase(this.applicationServices, username).execute();
    };
    return PrimaryServerQueryController;
}());
exports.PrimaryServerQueryController = PrimaryServerQueryController;
