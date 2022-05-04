"use strict";
exports.__esModule = true;
exports.ProductionServerApplication = void 0;
var GlobalCleavageDrawPileApplicationService_1 = require("../../../domain/applicationServices/GlobalCleavageDrawPileApplicationService");
var GlobalStreamersApplicationService_1 = require("../../../domain/applicationServices/GlobalStreamersApplicationService");
var PrimaryServerController_1 = require("../../../domain/ports/primary/PrimaryServerController");
var PrimaryServerQueryController_1 = require("../../../domain/ports/primary/PrimaryServerQueryController");
var ProductionServerApplication = /** @class */ (function () {
    function ProductionServerApplication(gateways, repositories) {
        this.gateways = gateways;
        this.repositories = repositories;
        var applicationService = {
            globalCleavageDrawPile: new GlobalCleavageDrawPileApplicationService_1.GlobalCleavageDrawPileApplicationService(this.repositories.globalCleavageDrawPileRepository, this.gateways.random),
            globalStreamers: new GlobalStreamersApplicationService_1.GlobalStreamersApplicationService(this.repositories.globalRegisteredStreamers)
        };
        this.queryController = new PrimaryServerQueryController_1.PrimaryServerQueryController(applicationService);
        this.gateways.event.configureController(new PrimaryServerController_1.PrimaryServerCommandController(applicationService));
    }
    return ProductionServerApplication;
}());
exports.ProductionServerApplication = ProductionServerApplication;
