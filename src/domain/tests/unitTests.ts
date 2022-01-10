import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { FakeChatGateway } from '../../infra/gateways/chat/FakeChatGateway'
import type { FakeEventGateway } from '../../infra/gateways/event/FakeEventGateway'
import type { ApplicationNotification } from '../entities/notification/Notification'
import type { ApplicationEvent } from '../events/GameEvent'
import type { InterfaceView } from '../entities/InterfaceView'
import type { ChatStatus } from '../entities/ChatStatus'
import type { FakeInterfaceGateway } from '../../infra/gateways/interface/FakeInterfaceGateway'
import { Gherkin } from './Gherkin'
import type { MessageForPlayer } from '../entities/MessageForPlayer'
import type { InMemoryCleavageRepository } from '../../infra/repositories/cleavage/InMemoryCleavageRepository'
import type { Cleavage } from '../entities/Cleavage'

export const theChatGatewayHasExpectedStatus = (gherkinPrefix: Gherkin, chatGateway: FakeChatGateway, chatStatus: ChatStatus):Test =>
    it(`${gherkinPrefix} the chat is '${chatStatus}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) chatGateway.status = chatStatus
        expect(chatGateway.status).equal(chatStatus)
    })

export const theInterfaceGatewayHasNotifications = (gherkinPrefix:Gherkin, interfaceGateway: FakeInterfaceGateway, notifications: ApplicationNotification[] | ApplicationNotification) =>
    it(`${gherkinPrefix} the notifications are sents :
        ${(Array.isArray(notifications) ? notifications : [notifications]).map(notification => JSON.stringify(notification)).join(',\n')}`, () => {
        expect(interfaceGateway.notifications).deep.equal(Array.isArray(notifications) ? notifications : [notifications])
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

export const theInterfaceGatewayHasCurrentCleavage = (gherkinPrefix:Gherkin, interfaceGateway: FakeInterfaceGateway, expectedCleavage: Cleavage):Test =>
    it(`${gherkinPrefix} the interface gateway has the current cleavage : '${expectedCleavage}'.`, () => {
        console.log(expectedCleavage)
        console.log(interfaceGateway.currentCleavage)
        expect(interfaceGateway.currentCleavage).deep.equal(expectedCleavage)
    })

export const theInterfaceGatewayDontHaveCleavage = (gherkinPrefix:Gherkin, interfaceGateway: FakeInterfaceGateway):Test =>
    it(`${gherkinPrefix} the interface gateway don'ty have cleavage.`, () => expect(interfaceGateway.currentCleavage).equal(undefined))

export const theChatGatewaySendMessageToPlayer = (gherkinPrefix:Gherkin, chatGateway:FakeChatGateway, expectedMessagesForPlayer:MessageForPlayer|MessageForPlayer[]) : Test => {
    const messagesForPlayer = Array.isArray(expectedMessagesForPlayer) ? expectedMessagesForPlayer : [expectedMessagesForPlayer]
    return it(`${gherkinPrefix} the chat gateway has messages for player: ${messagesForPlayer}`, () => expect(chatGateway.messagesForPlayer).deep.equal(messagesForPlayer))
}

export const theCleavageRepositoryHasCurrentCleavage = (gherkinPrefix: Gherkin, cleavageRepository: InMemoryCleavageRepository, expectedCleavage: Cleavage): Test =>
    it(`${gherkinPrefix} the cleavage repository has the following cleavage: ${expectedCleavage}`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) cleavageRepository.cleavage = expectedCleavage
        expect(cleavageRepository.cleavage).deep.equal(expectedCleavage, cleavageDetailedComparisonMessage(cleavageRepository.cleavage, expectedCleavage))
    })
export const theCleavageRepositoryDontHaveCurrentCleavage = (gherkinPrefix: Gherkin, cleavageRepository: InMemoryCleavageRepository): Test =>
    it(`${gherkinPrefix} the cleavage repository don't have a current cleavage.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN) cleavageRepository.cleavage = undefined
        expect(cleavageRepository.cleavage).equal(undefined)
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
