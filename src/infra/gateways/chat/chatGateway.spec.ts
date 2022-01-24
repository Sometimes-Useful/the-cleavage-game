import { describe, it } from 'mocha'
import { expect } from 'chai'
import { config } from 'dotenv'
import type { ChatGateway } from '../../../domain/ports/ChatGateway'
import type { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import { FakeChatGateway } from './FakeChatGateway'
import { formatTwitchUserMessage, TwitchChatGateway } from './TwitchChatGateway'
import { FakeEventGateway } from '../event/FakeEventGateway'
import { channel, integrationTestMessage, player1, token, username } from '../../../domain/tests/testContexts'
import { PlayerMessageEvent } from '../../../domain/events/playerMessage/PlayerMessageEvent'
import { EnvironmentVariable } from './EnvironmentVariable'
import { Player } from '../../../domain/entities/Player'
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
    describe(`Chat Gateway - ${environnement.adapter.constructor.name} - Integration Test`, () => {
        describe('Connect', () => {
            it('Given the adapter is disconnected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.false))
            it('When connect occurs.', () => environnement.adapter.connect(environnement.username, environnement.token, environnement.channel))
            it('Then the adapter is connected.', () => environnement.adapter.isConnected().then(isConnected => expect(isConnected).to.be.true))
        })
        describe('Send Message to player', () => {
            const messageForPlayer:MessageForPlayer = { player: player1, message: integrationTestMessage }
            it('Given the adapter is connected.', () => environnement.adapter.isConnected().then(isConnected => { expect(isConnected).to.be.true }))
            it('When sendMessageToPlayer occurs.', () => environnement.adapter.sendMessageToPlayer(messageForPlayer)).timeout(2000)
            it('Then the chat has the message.', (done) => {
                if (environnement.adapter instanceof FakeChatGateway) {
                    expect(environnement.adapter.messagesForPlayer).deep.equal([messageForPlayer])
                    done()
                }
                if (environnement.adapter instanceof TwitchChatGateway)
                    setTimeout(() => {
                        expect(inMemoryEventBus.events).deep.equal([new PlayerMessageEvent(new Player(environnement.username), formatTwitchUserMessage(messageForPlayer))])
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
