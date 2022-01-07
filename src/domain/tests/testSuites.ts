import { describe, Suite, Test } from 'mocha';
import { ChatApplicationService } from '../applicationServices/ChatApplicationService';
import { FakeEventGateway } from "../../infra/gateways/event/FakeEventGateway";
import { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway';
import { FakeNotificationGateway } from '../../infra/gateways/notification/FakeNotificationGateway';
import { FakeApplication } from "../../infra/applications/FakeApplication";
import { ApplicationEvent } from '../events/GameEvent';
import { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway';
import { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService';
import { EventApplicationService } from '../applicationServices/EventApplicationService';
import { CleavageApplicationService } from '../applicationServices/CleavageService';
import { InMemoryCleavageRepository } from "../../infra/repositories/cleavage/InMemoryCleavageRepository";
import { ApplicationServices } from '../ports/ApplicationServices';
import { FakeApplicationGateways } from '../ports/ApplicationGateways';
import { FakeApplicationRepositories } from '../ports/ApplicationRepositories';


type UnitTest = (application: FakeApplication) => Test;

export const feature = (gameEvent: ApplicationEvent, scenarios: (() => void|Suite)[]) => describe(`Feature: ${gameEvent.eventType}`, () => scenarios.forEach(scenario => scenario()));

export function scenario(scenarioTitle: string, tests: ((application: FakeApplication) => Test)[],skip?:boolean) {
    const eventGateway = new FakeEventGateway();
    const applicationGateways:FakeApplicationGateways = {
        chat:new FakeChatGateway(),
        notification:new FakeNotificationGateway(),
        event:eventGateway,
        interface:new FakeInterfaceGateway()
    }
    const applicationRepositories:FakeApplicationRepositories = {
        cleavage:new InMemoryCleavageRepository()
    }
    const applicationServices:ApplicationServices = {
        chat:new ChatApplicationService(applicationGateways.chat, applicationGateways.notification),
        event:new EventApplicationService(applicationGateways.event),
        cleavage:new CleavageApplicationService(applicationRepositories.cleavage,applicationGateways.chat),
        interface:new InterfaceApplicationService(applicationGateways.interface)
    }
    eventGateway.configureController(applicationServices)
    const application = new FakeApplication(
        applicationGateways,
        applicationRepositories
    );
    return skip
        ?()=>describe.skip(scenarioTitle, testSuite(application, tests))
        :()=>describe(scenarioTitle, testSuite(application, tests))
}

export const testSuite = (application: FakeApplication, tests: UnitTest[]): (this: Suite) => void => () => tests.forEach(test => test(application));


