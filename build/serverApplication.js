"use strict";
exports.__esModule = true;
exports.serverApplication = void 0;
var dotenv_1 = require("dotenv");
var ProductionServerApplication_1 = require("./infra/applications/server/ProductionServerApplication");
var EnvironmentVariable_1 = require("./infra/EnvironmentVariable");
var InMemoryProductionServerEventGateway_1 = require("./infra/gateways/event/InMemoryProductionServerEventGateway");
var ProductionRandomGateway_1 = require("./infra/gateways/random/ProductionRandomGateway");
var GcpDatastore_1 = require("./infra/repositories/globalCleavageDrawPile/GcpDatastore");
var GcpGlobalCleavageDrawPileRepository_1 = require("./infra/repositories/globalCleavageDrawPile/GcpGlobalCleavageDrawPileRepository");
var retrieveEnvVariable_1 = require("./infra/retrieveEnvVariable");
(0, dotenv_1.config)();
var gateways = {
    event: new InMemoryProductionServerEventGateway_1.InMemoryProductionServerEventGateway(),
    random: new ProductionRandomGateway_1.ProductionRandomGateway()
};
var repositories = {
    globalCleavageDrawPileRepository: new GcpGlobalCleavageDrawPileRepository_1.GcpGlobalCleavageDrawPileRepository(new GcpDatastore_1.GcpDatastore({
        gcpProjectId: JSON.parse((0, retrieveEnvVariable_1.retrieveEnvVariable)(process.env.GCP_PROJECT_ID, EnvironmentVariable_1.EnvironmentVariable.GCP_PROJECT_ID)).gcpProjectId,
        gcpClientEmail: JSON.parse((0, retrieveEnvVariable_1.retrieveEnvVariable)(process.env.GCP_CLIENT_EMAIL, EnvironmentVariable_1.EnvironmentVariable.GCP_CLIENT_EMAIL)).gcpClientEmail,
        gcpKindPrefix: '',
        gcpPrivateKey: JSON.parse((0, retrieveEnvVariable_1.retrieveEnvVariable)(process.env.GCP_PRIVATE_KEY, EnvironmentVariable_1.EnvironmentVariable.GCP_PRIVATE_KEY)).gcpPrivateKey
    }))
};
exports.serverApplication = new ProductionServerApplication_1.ProductionServerApplication(gateways, repositories);
