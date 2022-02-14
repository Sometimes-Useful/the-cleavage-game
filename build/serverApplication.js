"use strict";
exports.__esModule = true;
exports.serverApplication = void 0;
var serverEnvironnementVariables_1 = require("./env/serverEnvironnementVariables");
var ProductionServerApplication_1 = require("./infra/applications/server/ProductionServerApplication");
var InMemoryProductionServerEventGateway_1 = require("./infra/gateways/event/InMemoryProductionServerEventGateway");
var ProductionRandomGateway_1 = require("./infra/gateways/random/ProductionRandomGateway");
var GcpDatastore_1 = require("./infra/repositories/globalCleavageDrawPile/GcpDatastore");
var GcpGlobalCleavageDrawPileRepository_1 = require("./infra/repositories/globalCleavageDrawPile/GcpGlobalCleavageDrawPileRepository");
var gateways = {
    event: new InMemoryProductionServerEventGateway_1.InMemoryProductionServerEventGateway(),
    random: new ProductionRandomGateway_1.ProductionRandomGateway()
};
var repositories = {
    globalCleavageDrawPileRepository: new GcpGlobalCleavageDrawPileRepository_1.GcpGlobalCleavageDrawPileRepository(new GcpDatastore_1.GcpDatastore({
        gcpProjectId: serverEnvironnementVariables_1.gcpProjectId,
        gcpClientEmail: serverEnvironnementVariables_1.gcpClientEmail,
        gcpPrivateKey: serverEnvironnementVariables_1.gcpPrivateKey,
        gcpKindPrefix: ''
    }))
};
exports.serverApplication = new ProductionServerApplication_1.ProductionServerApplication(gateways, repositories);
