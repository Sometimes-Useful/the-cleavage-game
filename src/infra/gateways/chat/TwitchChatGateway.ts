import { ChatUserstate, Client, Options } from 'tmi.js'
import { PlayerMessageEvent } from '../../../domain/events/playerMessage/PlayerMessageEvent'
import { MessageForPlayer } from '../../../domain/entities/MessageForPlayer'
import type { Message } from '../../../domain/entities/message'
import { PlayerQuitEvent } from '../../../domain/events/playerQuit/PlayerQuitEvent'
import type { ChatGateway } from '../../../domain/ports/secondary/gateways/ChatGateway'
import type { InMemoryProductionClientEventGateway } from '../event/InMemoryProductionClientEventGateway'

const noTwitchClientSet = 'No Twitch Client Set'

export class TwitchChatGateway implements ChatGateway {
    constructor (
        private eventBus:InMemoryProductionClientEventGateway,
        private twitchClientDebug:boolean = false
    ) {}

    sendMessage (message: Message): Promise<void> {
        if (this.tmiClient === null) return Promise.reject(new Error(noTwitchClientSet))
        return !this.channel
            ? Promise.reject(new Error(channelUndefinedErrorMessage(message.message)))
            : !this.isClientConnected
                ? Promise.reject(new Error(twitchClientNotConnectedErrorMessage))
                : this.sendTmiMessageOnChannel(this.tmiClient, this.channel, message)
    }

    connect (username: string, password: string, channel: string): Promise<void> {
        const options:Options = {
            identity: { username, password },
            options: {
                debug: this.twitchClientDebug
            }
        }

        const tmiClient = new Client(options)
        this.tmiClient = tmiClient
        this.clientEvents()
        return this.tmiClient.connect()
            .then(([host, port]) => {
                this.isClientConnected = true
                return tmiClient.join(channel)
            })
            .then(result => {
                console.log('channel join - promise resolved')
                this.channel = channel
            })
            .catch(error => Promise.reject(error))
    }

    sendMessageToPlayer (messageForPlayer: MessageForPlayer): Promise<void> {
        if (this.tmiClient === null) return Promise.reject(new Error(noTwitchClientSet))
        return !this.channel
            ? Promise.reject(new Error(channelUndefinedErrorMessage(messageForPlayer.message)))
            : !this.isClientConnected
                ? Promise.reject(new Error(twitchClientNotConnectedErrorMessage))
                : this.sendTmiPrivateMessage(this.tmiClient, messageForPlayer)
    }

    private sendTmiPrivateMessage (tmiClient:Client, message: MessageForPlayer): Promise<void> {
        const messages = message.message.split('\n')
        return Promise.all(messages.map(privateMessage => tmiClient.whisper(message.username, privateMessage)))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private sendTmiMessageOnChannel (tmiClient:Client, channel:string, message: MessageForPlayer|Message): Promise<void> {
        const messages = message.message.split('\n')
        if (message instanceof MessageForPlayer)
            messages[0] = formatTwitchUserMessage(new MessageForPlayer(message.username, messages[0]))
        return Promise.all(messages.map(message => tmiClient.say(channel, message)))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    disconnect (): Promise<void> {
        if (this.tmiClient === null) return Promise.reject(new Error(noTwitchClientSet))
        return !this.channel
            ? Promise.reject(new Error(channelUndefinedErrorMessage('')))
            : !this.isClientConnected
                ? Promise.reject(new Error(twitchClientNotConnectedErrorMessage))
                : this.tmiClient.part(this.channel)
                    .then(channel => {
                        console.info(twitchClientDisconnecting)
                        return this.tmiClient === null
                            ? Promise.reject(new Error(noTwitchClientSet))
                            : this.tmiClient.disconnect()
                    })
                    .then(([host, port]) => {
                        console.log(twitchClientDisconnect, 'host :', host, 'port :', port)
                        this.isClientConnected = false
                        this.tmiClient = null
                        this.channel = null
                        return Promise.resolve()
                    })
                    .catch(error => Promise.reject(error))
    }

    isConnected (): Promise<boolean> {
        return Promise.resolve(this.isClientConnected)
    }

    private clientEvents () {
        if (this.tmiClient === null) throw new Error(noTwitchClientSet)
        this.tmiClient.on('join', (channel: string, username: string, self: boolean) => {
            console.log(twitchClientJoinChannelAsUser(channel, username))
        })
        this.tmiClient.on('part', (channel: string, username: string, self: boolean) => {
            console.log(twitchClientLeaveChannelAsUser(channel, username))
            this.eventBus.sendEvent(new PlayerQuitEvent(username))
        })
        this.tmiClient.on('connected', (host: string, port: number) => {
            console.log(twitchClientConnected(host, port))
        })
        this.tmiClient.on('connecting', (host: string, port: number) => {
            console.log(twitchClientConnecting(host, port))
        })
        this.tmiClient.on('disconnected', reason => {
            console.log(twitchClientDisconnect, 'Reason :', reason)
        })
        this.tmiClient.on('message', (channel: string, userstate: ChatUserstate, message: string, self: boolean) => {
            console.log(twitchClientMessage, { channel, userstate, message })
            if (userstate.username) this.sendPlayerMessageEventOnEventBus(new PlayerMessageEvent(userstate.username, message))
        })
    }

    private sendPlayerMessageEventOnEventBus (playerMessageEvent:PlayerMessageEvent) {
        this.eventBus.sendEvent(playerMessageEvent)
    }

    private isClientConnected = false
    private tmiClient:Client|null = null
    private channel:string|null = null
}

const channelUndefinedErrorMessage = (message:string) => `Channel is undefined. Can't send player message: ${message}`
const twitchClientConnecting = (host:string, port:number) => `Twitch client connecting on ${host}:${port} ...`
const twitchClientNotConnectedErrorMessage = 'Client not connected.'
const twitchClientConnected = (host:string, port:number) => `Twitch client connected on ${host}:${port}.`
const twitchClientMessage = 'Twitch client message'
const twitchClientDisconnecting = 'Twitch client disconnecting ...'
const twitchClientDisconnect = 'Twitch client disconnected.'
export const formatTwitchUserMessage = (messageForPlayer: MessageForPlayer): string => `@${messageForPlayer.username} >>> ${messageForPlayer.message}`
const twitchClientJoinChannelAsUser = (channel: string, username: string): string => `${username} joint channel '${channel}'.`
const twitchClientLeaveChannelAsUser = (channel: string, username: string): string => `${username} leave channel '${channel}'.`
