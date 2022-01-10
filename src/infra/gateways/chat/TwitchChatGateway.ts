import type { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import type { ChatGateway } from '../../../domain/ports/ChatGateway'
import { ChatUserstate, Client } from 'tmi.js'
import { PlayerMessageEvent } from '../../../domain/events/playerMessage/PlayerMessageEvent'
import type { InMemoryProductionEventGateway } from '../event/InMemoryProductionEventGateway'

export class TwitchChatGateway implements ChatGateway {
    constructor (private eventBus:InMemoryProductionEventGateway) {}
    connect (username: string, password: string, channel: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.client = new Client({ identity: { username, password }, channels: [channel] })
            this.client.on('connected', (address: string, port: number) => {
                this.isClientConnected = true
                this.channel = channel
                console.log(twitchClientConnected)
                resolve()
            })
            this.client.on('connecting', (address: string, port: number) => {
                console.log(twitchClientConnecting)
            })
            this.client.on('message', (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
                console.log(twitchClientMessage, 'channel :', channel, 'userstate :', userstate, 'message :', message)
                this.eventBus.sendEvent(new PlayerMessageEvent(message, userstate.username))
            })
            this.client.connect().catch(error => reject(error))
        })
    }

    sendMessageToPlayer (messageForPlayer: MessageForPlayer): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.client) reject(new Error(twitchClientNotSetErrorMessage))
            if (!this.channel) reject(new Error(channelUndefinedErrorMessage))
            if (!this.isClientConnected)reject(new Error(twitchClientNotConnectedErrorMessage))
            this.client.say(this.channel, formatTwitchUserMessage(messageForPlayer))
                .then(result => resolve())
                .catch(error => reject(error))
        })
    }

    disconnect (): Promise<void> {
        console.info(twitchClientDisconnecting)
        return new Promise<void>((resolve, reject) => {
            if (!this.client) reject(new Error(twitchClientNotSetErrorMessage))
            if (!this.isClientConnected) reject(new Error(twitchClientNotConnectedErrorMessage))
            this.client.on('disconnected', reason => {
                console.log(twitchClientDisconnect, 'Reason :', reason)
                this.isClientConnected = false
                this.client = undefined
                this.channel = undefined
                resolve()
            })
            this.client.disconnect().catch(error => reject(error))
        })
    }

    isConnected (): Promise<boolean> {
        // return Promise.resolve(true)
        return Promise.resolve(this.isClientConnected)
    }

    private isClientConnected = false
    private client?:Client
    private channel?:string
}

const twitchClientNotSetErrorMessage = 'Twitch client not set.'
const channelUndefinedErrorMessage = 'Channel is undefined.'
const twitchClientConnecting = 'Twitch client connecting...'
const twitchClientNotConnectedErrorMessage = 'Client not connected.'
const twitchClientConnected = 'Twitch client connected.'
const twitchClientMessage = 'Twitch client message'
const twitchClientDisconnecting = 'Twitch client disconnecting...'
const twitchClientDisconnect = 'Twitch client disconnected.'
function formatTwitchUserMessage (messageForPlayer: MessageForPlayer): string {
    return `@${messageForPlayer.player} : ${messageForPlayer.message}`
}
