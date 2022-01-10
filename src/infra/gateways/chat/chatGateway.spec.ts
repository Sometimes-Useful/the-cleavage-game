import { describe, it } from 'mocha'
import { expect } from 'chai'
import { config } from 'dotenv'
import type { ChatGateway } from '../../../domain/ports/ChatGateway'
import { FakeChatGateway } from './FakeChatGateway'
import { channel, integrationTestMessage, player, token, username } from '../../../domain/tests/testContexts'
import type { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import { TwitchChatGateway } from './TwitchChatGateway'
import { FakeEventGateway } from '../event/FakeEventGateway'
import { PlayerMessageEvent } from '../../../domain/events/playerMessage/PlayerMessageEvent'
import { EnvironmentVariable } from './EnvironmentVariable'
function retrieveEnvVariable (envVariableName:EnvironmentVariable) {
    const envVariableValue: string | undefined = process.env[envVariableName]
    if (envVariableValue) return envVariableValue
    throw new Error(`Missing env variable ${envVariableName}`)
}
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
const inMemoryEventBus = new FakeEventGateway()

config()
const twitch:IntegrationEnvironnement = {
    adapter: new TwitchChatGateway(inMemoryEventBus),
    username: retrieveEnvVariable(EnvironmentVariable.TWITCHUSERNAME),
    token: retrieveEnvVariable(EnvironmentVariable.TWITCHTOKEN),
    channel: retrieveEnvVariable(EnvironmentVariable.TWITCHCHANNEL)
}

const envs = [fake, twitch]

envs.forEach(environnement => {
    describe('Chat Gateway - Integration Test', () => {
        describe('Connect', () => {
            it('Given the adapter is disconnected.', () => {
                return environnement.adapter.isConnected()
                    .then(isConnected => expect(isConnected).to.be.false)
            })
            it('When connect occurs.', () => {
                return environnement.adapter.connect(environnement.username, environnement.token, environnement.channel)
            })
            it('Then the adapter is connected.', () => {
                return environnement.adapter.isConnected()
                    .then(isConnected => expect(isConnected).to.be.true)
            })
        })
        describe('Send Message to player', () => {
            const messageForPlayer:MessageForPlayer = {
                player: player,
                message: integrationTestMessage
            }
            it('Given the adapter is connected.', () => {
                return environnement.adapter.isConnected()
                    .then(isConnected => expect(isConnected).to.be.true)
            })
            it('When sendMessageToPlayer occurs.', () => environnement.adapter.sendMessageToPlayer(messageForPlayer)).timeout(5000)
            it('Then the chat has the message.', () => {
                if (environnement.adapter instanceof FakeChatGateway)
                    expect(environnement.adapter.messagesForPlayer).deep.equal([messageForPlayer])
                if (environnement.adapter instanceof TwitchChatGateway) {
                    const interval = setInterval(() => {
                        if (inMemoryEventBus.events.includes(new PlayerMessageEvent(messageForPlayer.player, messageForPlayer.message))) {
                            expect(inMemoryEventBus.events).deep.equal([new PlayerMessageEvent(messageForPlayer.player, messageForPlayer.message)])
                            clearInterval(interval)
                        }
                    }, 100)
                }
            })
        })
        describe('Disconnect', () => {
            it('Given the adapter is connected.', () => {
                return environnement.adapter.isConnected()
                    .then(isConnected => expect(isConnected).to.be.true)
            })
            it('When disconnect occurs.', () => environnement.adapter.disconnect())
            it('Then the adapter is disconnected.', () => {
                return environnement.adapter.isConnected()
                    .then(isConnected => expect(isConnected).to.be.false)
            })
        })
    })
})
