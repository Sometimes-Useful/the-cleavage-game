import { expect } from 'chai'
import { Test, it } from 'mocha'
import { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway'
import { FakeEventGateway } from '../../infra/gateways/event/FakeEventGateway'
import { FakeNotificationGateway } from '../../infra/gateways/notification/FakeNotificationGateway'
import { ApplicationNotification } from '../entities/notification/Notification'
import { ApplicationEvent } from '../events/GameEvent'
import { InterfaceView } from '../entities/InterfaceView'
import { ChatStatus } from '../entities/ChatStatus'
import { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway'
import { Gherkin } from './Gherkin'
import { MessageForPlayer } from '../entities/MessageForPlayer'
import { InMemoryCleavageRepository } from '../../infra/repositories/cleavage/InMemoryCleavageRepository'
import { Cleavage } from '../entities/Cleavage'

export const theChatGatewayHasExpectedStatus = (gherkinPrefix: Gherkin, chatGateway: FakeChatGateway, chatStatus: ChatStatus):Test =>
    it(`${gherkinPrefix} the chat is '${chatStatus}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) chatGateway.status = chatStatus
        expect(chatGateway.status).equal(chatStatus)
    })

export const theNotificationGatewayHasNotifications = (gherkinPrefix:Gherkin, notificationGateway: FakeNotificationGateway, notifications: ApplicationNotification[] | ApplicationNotification) =>
    it(`${gherkinPrefix} the notifications are sents :
        ${(Array.isArray(notifications) ? notifications : [notifications]).map(notification => JSON.stringify(notification)).join(',\n')}`, () => {
        expect(notificationGateway.notifications).deep.equal(Array.isArray(notifications) ? notifications : [notifications])
    })

export const whenEventOccurs = (eventBus: FakeEventGateway, event: ApplicationEvent):Test =>
    it(`When the event '${event.eventType}' occurs.`, () => eventBus.onEvent(event))

export const theInterfaceGatewayHasCurrentView = (gherkinPrefix:Gherkin, interfaceGateway: FakeInterfaceGateway, expectedInterfaceView: InterfaceView):Test =>
    it(`${gherkinPrefix} the interface gateway has the current view '${expectedInterfaceView}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) interfaceGateway.currentView = expectedInterfaceView
        expect(interfaceGateway.currentView).equal(expectedInterfaceView)
    })

export const theEventIsSent = (gherkinPrefix:Gherkin, eventGateway:FakeEventGateway, expectedEvents: ApplicationEvent | ApplicationEvent[]):Test => {
    const events : ApplicationEvent[] = Array.isArray(expectedEvents) ? expectedEvents : [expectedEvents]
    return it(`${gherkinPrefix} the event gateway has events '${events}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) eventGateway.events = events
        expect(eventGateway.events).deep.equal(events)
    })
}

export const theInterfaceCurrentCleavageTitleHasValue = (gherkinPrefix:Gherkin, interfaceGateway: FakeInterfaceGateway, expectedCleavageTitle: string):Test =>
    it(`${gherkinPrefix} the interface gateway has the current cleavage title value set with '${expectedCleavageTitle}'.`, () => expect(interfaceGateway.currentCleavageTitle).equal(expectedCleavageTitle))

export const theChatGatewaySendMessageToPlayer = (gherkinPrefix:Gherkin, chatGateway:FakeChatGateway, expectedMessagesForPlayer:MessageForPlayer|MessageForPlayer[]) : Test => {
    const messagesForPlayer = Array.isArray(expectedMessagesForPlayer) ? expectedMessagesForPlayer : [expectedMessagesForPlayer]
    return it(`${gherkinPrefix} the chat gateway has messages for player: ${messagesForPlayer}`, () => expect(chatGateway.messagesForPlayer).deep.equal(messagesForPlayer))
}

export const theCleavageRepositoryHasCurrentCleavage = (gherkinPrefix: Gherkin, cleavageRepository: InMemoryCleavageRepository, expectedCleavage: Cleavage): Test =>
    it(`${gherkinPrefix} the cleavage repository has the following cleavage: ${expectedCleavage}`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) cleavageRepository.cleavage = expectedCleavage
        expect(cleavageRepository.cleavage).deep.equal(expectedCleavage, cleavageDetailedComparisonMessage(cleavageRepository.cleavage, expectedCleavage))
    })

const cleavageDetailedComparisonMessage = (cleavage: Cleavage|undefined, expectedCleavage: Cleavage): string => `DETAILS\nexpected >>>>>>>> ${stringifyWithDetailledSetAndMap(cleavage)} \nto deeply equal > ${stringifyWithDetailledSetAndMap(expectedCleavage)} \n`
const stringifyWithDetailledSetAndMap = (value: any) => JSON.stringify(value, detailledStringifyForSetAndMap)
const mapToObjectLiteral = (value: Map<any, any>): any => Array.from(value).reduce((obj: any, [key, value]) => {
    obj[key] = value
    return obj
}, {})
const detailledStringifyForSetAndMap = (key: string, value: any): any => (value instanceof Set)
    ? [...value.values()]
    : (value instanceof Map) ? mapToObjectLiteral(value) : value
