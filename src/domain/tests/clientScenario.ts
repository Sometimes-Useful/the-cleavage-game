import { describe, Test } from 'mocha'
import { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { FakeClientEventGateway } from '../../infra/gateways/event/FakeClientEventGateway'
import { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway'
import { FakeClientApplication } from '../../infra/applications/client/FakeApplication'
import { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway'
import { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { EventApplicationService } from '../applicationServices/EventApplicationService'
import { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { ClientApplicationServices } from '../ports/ApplicationServices'
import { InMemoryPlayerRepository } from '../../infra/repositories/player/InMemoryPlayerRepository'
import { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import { InMemoryCurrentCleavageRepository } from '../../infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import type { FakeClientApplicationGateways } from '../ports/secondary/gateways/ApplicationGateways'
import type { FakeClientApplicationRepositories } from '../ports/secondary/repositories/ApplicationRepositories'
import { InMemoryPublicCleavageDrawPileRepository } from '../../infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import { FakeRandomGateway } from '../../infra/gateways/random/FakeRandomGateway'
import { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import { FakeDateGateway } from '../../infra/gateways/date/FakeDateGateway'
import { InMemoryAutoplayRepository } from '../../infra/repositories/autoplay/InMemoryAutoplayRepository'
import { FakeGlobalCleavageDrawPileGateway } from '../../infra/gateways/globalCleavageDrawPile/FakeGlobalCleavageDrawPileGateway'
import { clientTestSuite } from './testSuite'
import { PrimaryClientController } from '../ports/primary/PrimaryClientController'

export function clientScenario (scenarioTitle: string, unitTests: ((application: FakeClientApplication) => Test)[], skip?: boolean) {
    const eventGateway = new FakeClientEventGateway()
    const applicationGateways: FakeClientApplicationGateways = {
        chat: new FakeChatGateway(),
        event: eventGateway,
        interface: new FakeInterfaceGateway(),
        random: new FakeRandomGateway(),
        date: new FakeDateGateway(),
        globalCleavageDrawPile: new FakeGlobalCleavageDrawPileGateway()
    }
    const applicationRepositories: FakeClientApplicationRepositories = {
        publicCleavageDrawPile: new InMemoryPublicCleavageDrawPileRepository(),
        player: new InMemoryPlayerRepository(),
        currentCleavage: new InMemoryCurrentCleavageRepository(),
        autoplay: new InMemoryAutoplayRepository()
    }
    const applicationServices: ClientApplicationServices = {
        chat: new ChatApplicationService(applicationGateways.chat, applicationGateways.interface),
        event: new EventApplicationService(applicationGateways.event),
        cleavage: new CleavageApplicationService(applicationRepositories.publicCleavageDrawPile, applicationGateways.globalCleavageDrawPile, applicationRepositories.currentCleavage, applicationGateways.chat),
        interface: new InterfaceApplicationService(applicationGateways.interface),
        player: new PlayerApplicationService(applicationRepositories.player),
        autoplay: new AutoplayApplicationService(applicationRepositories.autoplay, applicationGateways.date)
    }
    eventGateway.configureController(new PrimaryClientController(applicationServices))
    const application = new FakeClientApplication(
        applicationGateways,
        applicationRepositories
    )
    return skip
        ? () => describe.skip(scenarioTitle, clientTestSuite(application, unitTests))
        : () => describe(scenarioTitle, clientTestSuite(application, unitTests))
}