import { expect } from 'chai'
import { Test, it } from 'mocha'
import type { ChatStatus } from '../../entities/ChatStatus'
import type { FakeClientApplication } from '../../../infra/applications/client/FakeApplication'
import type { Message } from '../../entities/message'
import type { MessageForPlayer } from '../../entities/MessageForPlayer'
import { isGiven } from './unitTests'
import type { Gherkin } from '../Gherkin'
import { uniqueOrArrayToArray } from '../../../generic/array'

export const theChatGatewayHasExpectedStatus = (gherkinPrefix: Gherkin, chatStatus: ChatStatus) => (application:FakeClientApplication): Test =>
    it(`${gherkinPrefix} the chat is '${chatStatus}'.`, () => {
        if (isGiven(gherkinPrefix)) application.gateways.chat.status = chatStatus
        expect(application.gateways.chat.status).equal(chatStatus)
    })

export const theChatGatewaySendMessageToPlayer = (gherkinPrefix:Gherkin, expectedMessagesForPlayer:MessageForPlayer|MessageForPlayer[]) => (application:FakeClientApplication) : Test => {
    const messagesForPlayer = uniqueOrArrayToArray(expectedMessagesForPlayer)
    return it(`${gherkinPrefix} the chat gateway has messages for player: ${JSON.stringify(messagesForPlayer)}`, () =>
        expect(application.gateways.chat.messagesForPlayer).deep.equal(messagesForPlayer)
    )
}

export const theChatGatewaDontSendMessageToPlayer = (gherkinPrefix:Gherkin) => (application:FakeClientApplication) : Test => {
    return it(`${gherkinPrefix} the chat gateway don't has messages for player.`, () =>
        expect(application.gateways.chat.messagesForPlayer).deep.equal([])
    )
}

export const theChatGatewaySendMessage = (gherkinPrefix:Gherkin, expectedMessages:Message|Message[]) => (application:FakeClientApplication):Test => {
    const messages = uniqueOrArrayToArray(expectedMessages)
    return it(`${gherkinPrefix} the chat gateway has messages : ${JSON.stringify(messages)}`, () =>
        expect(application.gateways.chat.messages).deep.equal(messages)
    )
}
