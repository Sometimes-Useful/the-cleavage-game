import { describe, Test } from 'mocha'
import { FakeServerEventGateway } from '../../infra/gateways/event/FakeServerEventGateway'
import { serverTestSuite } from './testSuite'
import type { ServerApplicationServices } from '../ports/ApplicationServices'
import { FakeServerApplication } from '../../infra/applications/server/FakeServerApplication'
import type { FakeServerApplicationGateways } from '../ports/secondary/gateways/ApplicationGateways'
import type { FakeServerApplicationRepositories } from '../ports/secondary/repositories/ApplicationRepositories'
import { InMemoryGlobalCleavageDrawPileRepository } from '../../infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import { GlobalCleavageDrawPileApplicationService } from '../applicationServices/GlobalCleavageDrawPileApplicationService'
import { FakeRandomGateway } from '../../infra/gateways/random/FakeRandomGateway'
import { PrimaryServerCommandController } from '../ports/primary/PrimaryServerController'
import { PrimaryServerQueryController } from '../ports/primary/PrimaryServerQueryController'

export function serverScenario (scenarioTitle: string, unitTests: ((application: FakeServerApplication) => Test)[], skip?: boolean) {
    const eventGateway = new FakeServerEventGateway()
    const applicationGateways: FakeServerApplicationGateways = {
        event: eventGateway,
        random: new FakeRandomGateway()
    }
    const applicationRepositories: FakeServerApplicationRepositories = {
        globalCleavageDrawPileRepository: new InMemoryGlobalCleavageDrawPileRepository()
    }
    const applicationServices: ServerApplicationServices = {
        globalCleavageDrawPile: new GlobalCleavageDrawPileApplicationService(applicationRepositories.globalCleavageDrawPileRepository, applicationGateways.random)
    }
    eventGateway.configureController(new PrimaryServerCommandController(applicationServices))
    const serverApplication = new FakeServerApplication(
        applicationGateways,
        applicationRepositories,
        new PrimaryServerQueryController(applicationServices)
    )
    return skip
        ? () => describe.skip(scenarioTitle, serverTestSuite(serverApplication, unitTests))
        : () => describe(scenarioTitle, serverTestSuite(serverApplication, unitTests))
}
export const skip = true
