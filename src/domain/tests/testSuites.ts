import { describe, Suite, Test } from 'mocha'
import { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { FakeEventGateway } from '../../infra/gateways/event/FakeEventGateway'
import { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway'
import { FakeApplication } from '../../infra/applications/FakeApplication'
import { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway'
import { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { EventApplicationService } from '../applicationServices/EventApplicationService'
import { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { ApplicationServices } from '../ports/ApplicationServices'
import type { EventType } from '../events/EventType'
import { InMemoryPlayerRepository } from '../../infra/repositories/player/InMemoryPlayerRepository'
import { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import { InMemoryCurrentCleavageRepository } from '../../infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import type { FakeApplicationGateways } from '../ports/secondary/gateways/ApplicationGateways'
import type { FakeApplicationRepositories } from '../ports/secondary/repositories/ApplicationRepositories'
import { InMemoryGlobalCleavageDrawPileRepository } from '../../infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import { InMemoryPublicCleavageDrawPileRepository } from '../../infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import { FakeRandomGateway } from '../../infra/gateways/random/FakeRandomGateway'
import { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import { FakeDateGateway } from '../../infra/gateways/date/FakeDateGateway'
import { InMemoryAutoplayRepository } from '../../infra/repositories/autoplay/InMemoryAutoplayRepository'

type UnitTest = (application: FakeApplication) => Test;

export const feature = (eventType: EventType, scenarios: (() => void|Suite)[]) => describe(`Feature: ${eventType}`, () => scenarios.forEach(scenario => scenario()))

export function scenario (scenarioTitle: string, unitTests: ((application: FakeApplication) => Test)[], skip?:boolean) {
    const eventGateway = new FakeEventGateway()
    const applicationGateways:FakeApplicationGateways = {
        chat: new FakeChatGateway(),
        event: eventGateway,
        interface: new FakeInterfaceGateway(),
        random: new FakeRandomGateway(),
        date: new FakeDateGateway()
    }
    const applicationRepositories:FakeApplicationRepositories = {
        publicCleavageDrawPile: new InMemoryPublicCleavageDrawPileRepository(),
        player: new InMemoryPlayerRepository(),
        globalCleavageDrawPile: new InMemoryGlobalCleavageDrawPileRepository(),
        currentCleavage: new InMemoryCurrentCleavageRepository(),
        autoplay: new InMemoryAutoplayRepository()
    }
    const applicationServices:ApplicationServices = {
        chat: new ChatApplicationService(applicationGateways.chat, applicationGateways.interface),
        event: new EventApplicationService(applicationGateways.event),
        cleavage: new CleavageApplicationService(applicationRepositories.publicCleavageDrawPile, applicationRepositories.globalCleavageDrawPile, applicationRepositories.currentCleavage, applicationGateways.chat, applicationGateways.random),
        interface: new InterfaceApplicationService(applicationGateways.interface),
        player: new PlayerApplicationService(applicationRepositories.player),
        autoplay: new AutoplayApplicationService(applicationRepositories.autoplay, applicationGateways.date)
    }
    eventGateway.configureController(applicationServices)
    const application = new FakeApplication(
        applicationGateways,
        applicationRepositories
    )
    return skip
        ? () => describe.skip(scenarioTitle, testSuite(application, unitTests))
        : () => describe(scenarioTitle, testSuite(application, unitTests))
}

export const testSuite = (application: FakeApplication, unitTests: UnitTest[]): (this: Suite) => void => () => unitTests.forEach(unitTest => unitTest(application))
