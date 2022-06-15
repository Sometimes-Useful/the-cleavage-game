import type { ProductionServerApplicationGateways } from './domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionServerApplicationRepositories } from './domain/ports/secondary/repositories/ApplicationRepositories'
import { gcpClientEmail, gcpPrivateKey, gcpProjectId } from './env/serverEnvironnementVariables'
import { ProductionServerApplication } from './infra/applications/server/ProductionServerApplication'
import { InMemoryProductionServerEventGateway } from './infra/gateways/event/InMemoryProductionServerEventGateway'
import { ProductionRandomGateway } from './infra/gateways/random/ProductionRandomGateway'
import { GcpGlobalCleavageDrawPileRepository } from './infra/repositories/globalCleavageDrawPile/GcpGlobalCleavageDrawPileRepository'
import { GcpGlobalRegisteredStreamersRepository } from './infra/repositories/registeredStreamers/GcpRegisteredStreamersRepository'
import { GcpDatastore } from './infra/tech/GcpDatastore'
const gateways: ProductionServerApplicationGateways = {
    event: new InMemoryProductionServerEventGateway(),
    random: new ProductionRandomGateway()
}
const gcpDatastore = new GcpDatastore({
    gcpProjectId: gcpProjectId,
    gcpClientEmail: gcpClientEmail,
    gcpPrivateKey: gcpPrivateKey,
    gcpKindPrefix: ''
})
export const productionRepositories: ProductionServerApplicationRepositories = {
    globalRegisteredStreamers: new GcpGlobalRegisteredStreamersRepository(gcpDatastore),
    globalCleavageDrawPileRepository: new GcpGlobalCleavageDrawPileRepository(gcpDatastore)
}
export const serverApplication = new ProductionServerApplication(gateways, productionRepositories)
