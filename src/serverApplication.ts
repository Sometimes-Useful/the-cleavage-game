import { config } from 'dotenv'
import type { ProductionServerApplicationGateways } from './domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionServerApplicationRepositories } from './domain/ports/secondary/repositories/ApplicationRepositories'
import { ProductionServerApplication } from './infra/applications/server/ProductionServerApplication'
import { EnvironmentVariable } from './infra/EnvironmentVariable'
import { InMemoryProductionServerEventGateway } from './infra/gateways/event/InMemoryProductionServerEventGateway'
import { ProductionRandomGateway } from './infra/gateways/random/ProductionRandomGateway'
import { GcpDatastore } from './infra/repositories/globalCleavageDrawPile/GcpDatastore'
import { GcpGlobalCleavageDrawPileRepository } from './infra/repositories/globalCleavageDrawPile/GcpGlobalCleavageDrawPileRepository'
import { retrieveEnvVariable } from './infra/retrieveEnvVariable'
config()
const gateways: ProductionServerApplicationGateways = {
    event: new InMemoryProductionServerEventGateway(),
    random: new ProductionRandomGateway()
}
const repositories: ProductionServerApplicationRepositories = {
    globalCleavageDrawPileRepository: new GcpGlobalCleavageDrawPileRepository(new GcpDatastore({
        gcpProjectId: JSON.parse(retrieveEnvVariable(process.env.GCP_PROJECT_ID, EnvironmentVariable.GCP_PROJECT_ID)).gcpProjectId,
        gcpClientEmail: JSON.parse(retrieveEnvVariable(process.env.GCP_CLIENT_EMAIL, EnvironmentVariable.GCP_CLIENT_EMAIL)).gcpClientEmail,
        gcpKindPrefix: '',
        gcpPrivateKey: JSON.parse(retrieveEnvVariable(process.env.GCP_PRIVATE_KEY, EnvironmentVariable.GCP_PRIVATE_KEY)).gcpPrivateKey
    }))
}

export const serverApplication = new ProductionServerApplication(gateways, repositories)
