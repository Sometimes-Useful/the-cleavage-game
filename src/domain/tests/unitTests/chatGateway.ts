import { expect } from 'chai'
import { Test, it } from 'mocha'
import { Gherkin } from '../Gherkin'
import type { ChatStatus } from '../../entities/ChatStatus'
import type { FakeApplication } from '../../../infra/applications/FakeApplication'
import type { Message } from '../../entities/message'
import type { MessageForPlayer } from '../../entities/MessageForPlayer'

export const theChatGatewayHasExpectedStatus = (gherkinPrefix: Gherkin, application: FakeApplication, chatStatus: ChatStatus): Test =>
    it(`${gherkinPrefix} the chat is '${chatStatus}'.`, () => {
        if (gherkinPrefix === Gherkin.GIVEN || gherkinPrefix === Gherkin.AND_GIVEN)
            application.gateways.chat.status = chatStatus
        expect(application.gateways.chat.status).equal(chatStatus)
    })

export const theChatGatewaySendMessageToPlayer = (gherkinPrefix:Gherkin, application:FakeApplication, expectedMessagesForPlayer:MessageForPlayer|MessageForPlayer[]) : Test => {
    const messagesForPlayer = Array.isArray(expectedMessagesForPlayer) ? expectedMessagesForPlayer : [expectedMessagesForPlayer]
    return it(`${gherkinPrefix} the chat gateway has messages for player: ${JSON.stringify(messagesForPlayer)}`, () =>
        expect(application.gateways.chat.messagesForPlayer).deep.equal(messagesForPlayer)
    )
}

export const theChatGatewaySendMessage = (gherkinPrefix:Gherkin, application:FakeApplication, expectedMessages:Message|Message[]):Test => {
    const messages = Array.isArray(expectedMessages) ? expectedMessages : [expectedMessages]
    return it(`${gherkinPrefix} the chat gateway has messages : ${JSON.stringify(messages)}`, () => expect(application.gateways.chat.messages).deep.equal(messages))
}
