import { describe, it } from 'mocha'
import { expect } from 'chai'
import { config } from 'dotenv'
import { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import { FakeChatGateway } from './FakeChatGateway'
import { formatTwitchUserMessage, TwitchChatGateway } from './TwitchChatGateway'
import { FakeClientEventGateway } from '../event/FakeClientEventGateway'
import { channel, integrationTestMessage, player1, token, username } from '../../../domain/tests/testContexts'
import { PlayerMessageEvent } from '../../../domain/events/playerMessage/PlayerMessageEvent'
import { Player } from '../../../domain/entities/Player'
import type { ChatGateway } from '../../../domain/ports/secondary/gateways/ChatGateway'
import { onMissingEnvVariable } from '../../EnvironmentVariable'
interface IntegrationEnvironnement {
    adapter: ChatGateway
    username:string
    token:string
    channel:string
}
const fake:IntegrationEnvironnement = {
    adapter: new FakeChatGateway(),
    username: username,
    token: token,
    channel: channel
}
const inMemoryEventBus = new FakeClientEventGateway()

config()
const twitchUserName = process.env.TWITCHUSERNAME ? process.env.TWITCHUSERNAME : onMissingEnvVariable('process.env.TWITCHUSERNAME')
const twitchToken = process.env.TWITCHTOKEN ? process.env.TWITCHTOKEN : onMissingEnvVariable('process.env.TWITCHTOKEN')
const twitchChannel = process.env.TWITCHCHANNEL ? process.env.TWITCHCHANNEL : onMissingEnvVariable('process.env.TWITCHCHANNEL')
const twitch:IntegrationEnvironnement = {
    adapter: new TwitchChatGateway(inMemoryEventBus),
    username: twitchUserName,
    token: twitchToken,
    channel: twitchChannel
}

const envs = [fake, twitch]

describe('Integration Test: Chat Gateway', () => {
    envs.forEach(environnement => {
        describe(`${environnement.adapter.constructor.name}`, () => {
            describe('Connect', () => {
                it('Given the adapter is disconnected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.false))
                it('When connect occurs.', () => environnement.adapter.connect(environnement.username, environnement.token, environnement.channel))
                it('Then the adapter is connected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.true))
            })
            describe('Send Message to player', () => {
                const messageForPlayer = new MessageForPlayer(player1, integrationTestMessage)
                it('Given the adapter is connected.', () => environnement.adapter.isConnected().then(isConnected => { expect(isConnected).to.be.true }))
                it('When sendMessageToPlayer occurs.', () => environnement.adapter.sendMessageToPlayer(messageForPlayer)).timeout(2000)
                it('Then the chat has the message.', (done) => {
                    if (environnement.adapter instanceof FakeChatGateway) {
                        expect(environnement.adapter.messagesForPlayer).deep.equal([messageForPlayer])
                        done()
                    }
                    if (environnement.adapter instanceof TwitchChatGateway)
                        setTimeout(() => {
                            expect(inMemoryEventBus.events).deep.equal([new PlayerMessageEvent(new Player({ username: environnement.username }), formatTwitchUserMessage(messageForPlayer))])
                            done()
                        }, 20)
                })
            })
            describe('Disconnect', () => {
                it('Given the adapter is connected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.true))
                it('When disconnect occurs.', () => environnement.adapter.disconnect())
                it('Then the adapter is disconnected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.false))
            })
        })
    })
})
