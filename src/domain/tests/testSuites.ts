import { describe, Suite, Test } from 'mocha'
import { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import { FakeEventGateway } from '../../infra/gateways/event/FakeEventGateway'
import { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway'
import { FakeApplication } from '../../infra/applications/FakeApplication'
import { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway'
import { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { EventApplicationService } from '../applicationServices/EventApplicationService'
import { CleavageApplicationService } from '../applicationServices/CleavageService'
import { InMemoryCleavageRepository } from '../../infra/repositories/cleavage/InMemoryCleavageRepository'
import type { ApplicationServices } from '../ports/ApplicationServices'
import type { FakeApplicationGateways } from '../ports/ApplicationGateways'
import type { FakeApplicationRepositories } from '../ports/ApplicationRepositories'
import type { EventType } from '../events/EventType'

type UnitTest = (application: FakeApplication) => Test;

export const feature = (eventType: EventType, scenarios: (() => void|Suite)[]) => describe(`Feature: ${eventType}`, () => scenarios.forEach(scenario => scenario()))

export function scenario (scenarioTitle: string, tests: ((application: FakeApplication) => Test)[], skip?:boolean) {
    const eventGateway = new FakeEventGateway()
    const applicationGateways:FakeApplicationGateways = {
        chat: new FakeChatGateway(),
        event: eventGateway,
        interface: new FakeInterfaceGateway()
    }
    const applicationRepositories:FakeApplicationRepositories = {
        cleavage: new InMemoryCleavageRepository()
    }
    const applicationServices:ApplicationServices = {
        chat: new ChatApplicationService(applicationGateways.chat, applicationGateways.interface),
        event: new EventApplicationService(applicationGateways.event),
        cleavage: new CleavageApplicationService(applicationRepositories.cleavage, applicationGateways.chat),
        interface: new InterfaceApplicationService(applicationGateways.interface)
    }
    eventGateway.configureController(applicationServices)
    const application = new FakeApplication(
        applicationGateways,
        applicationRepositories
    )
    return skip
        ? () => describe.skip(scenarioTitle, testSuite(application, tests))
        : () => describe(scenarioTitle, testSuite(application, tests))
}

export const testSuite = (application: FakeApplication, tests: UnitTest[]): (this: Suite) => void => () => tests.forEach(test => test(application))
