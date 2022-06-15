import { expect } from 'chai'
import { config } from 'dotenv'
import { describe, it } from 'mocha'
import { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import { PlayerMessageEvent } from '../../../domain/events/playerMessage/PlayerMessageEvent'
import type { ChatGateway } from '../../../domain/ports/secondary/gateways/ChatGateway'
import { channel, integrationTestMessage, player1, token, username } from '../../../domain/tests/testContexts'
import { onMissingEnvVariable } from '../../EnvironmentVariable'
import { FakeClientEventGateway } from '../event/FakeClientEventGateway'
import { FakeChatGateway } from './FakeChatGateway'
import { formatTwitchUserMessage, TwitchChatGateway } from './TwitchChatGateway'
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

describe('Integration Test - Chat Gateway', () => {
    envs.forEach(environnement => {
        describe(`${environnement.adapter.constructor.name}`, () => {
            describe('Connect', () => {
                it('Given the adapter is disconnected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.false))
                it('When connect occurs.', () => environnement.adapter.connect(environnement.username, environnement.token, environnement.channel))
                it('Then the adapter is connected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.true))
            })
            describe('Send Message', () => {
                const messageForPlayer = new MessageForPlayer(player1().username, integrationTestMessage)
                it('Given the adapter is connected.', () => environnement.adapter.isConnected().then(isConnected => { expect(isConnected).to.be.true }))
                it('When sendMessage occurs.', () => environnement.adapter.sendMessage(messageForPlayer)).timeout(2000)
                it('Then the chat has the message.', (done) => {
                    if (environnement.adapter instanceof FakeChatGateway) {
                        expect(environnement.adapter.messages).deep.equal([messageForPlayer])
                        done()
                    }
                    if (environnement.adapter instanceof TwitchChatGateway)
                        setTimeout(() => {
                            expect(inMemoryEventBus.events).deep.equal([new PlayerMessageEvent(environnement.username, formatTwitchUserMessage(messageForPlayer))])
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
