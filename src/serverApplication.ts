import type { ProductionServerApplicationGateways } from './domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionServerApplicationRepositories } from './domain/ports/secondary/repositories/ApplicationRepositories'
import { gcpProjectId, gcpClientEmail, gcpPrivateKey } from './env/serverEnvironnementVariables'
import { ProductionServerApplication } from './infra/applications/server/ProductionServerApplication'
import { InMemoryProductionServerEventGateway } from './infra/gateways/event/InMemoryProductionServerEventGateway'
import { ProductionRandomGateway } from './infra/gateways/random/ProductionRandomGateway'
import { GcpDatastore } from './infra/repositories/globalCleavageDrawPile/GcpDatastore'
import { GcpGlobalCleavageDrawPileRepository } from './infra/repositories/globalCleavageDrawPile/GcpGlobalCleavageDrawPileRepository'
const gateways: ProductionServerApplicationGateways = {
    event: new InMemoryProductionServerEventGateway(),
    random: new ProductionRandomGateway()
}
const repositories: ProductionServerApplicationRepositories = {
    globalCleavageDrawPileRepository: new GcpGlobalCleavageDrawPileRepository(new GcpDatastore({
        gcpProjectId: gcpProjectId,
        gcpClientEmail: gcpClientEmail,
        gcpPrivateKey: gcpPrivateKey,
        gcpKindPrefix: ''
    }))
}
export const serverApplication = new ProductionServerApplication(gateways, repositories)
