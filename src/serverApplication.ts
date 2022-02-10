import type { ProductionServerApplicationGateways } from './domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionServerApplicationRepositories } from './domain/ports/secondary/repositories/ApplicationRepositories'
import { ProductionServerApplication } from './infra/applications/server/ProductionServerApplication'
import { InMemoryProductionServerEventGateway } from './infra/gateways/event/InMemoryProductionServerEventGateway'
import { ProductionRandomGateway } from './infra/gateways/random/ProductionRandomGateway'
import { InMemoryGlobalCleavageDrawPileRepository } from './infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'

const gateways: ProductionServerApplicationGateways = {
    event: new InMemoryProductionServerEventGateway(),
    random: new ProductionRandomGateway()
}
const repositories: ProductionServerApplicationRepositories = {
    globalCleavageDrawPileRepository: new InMemoryGlobalCleavageDrawPileRepository()
}

export const serverApplication = new ProductionServerApplication(gateways, repositories)
