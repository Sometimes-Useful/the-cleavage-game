import * as Tone from 'tone'
import { SupportedMusic } from './domain/entities/music/SupportedMusic'
import type { ProductionApplicationGateways } from './domain/ports/ApplicationGateways'
import type { ProductionApplicationRepositories } from './domain/ports/ApplicationRepositories'
import { SupportedSound } from './domain/ports/SoundType'
import { ProductionApplication } from './infra/applications/ProductionApplication'
import { TwitchChatGateway } from './infra/gateways/chat/TwitchChatGateway'
import { InMemoryProductionEventGateway } from './infra/gateways/event/InMemoryProductionEventGateway'
import { SvelteAndToneInterfaceGateway } from './infra/gateways/interface/SvelteAndToneInterfaceGateway'
import { InMemoryCleavageRepository } from './infra/repositories/cleavage/InMemoryCleavageRepository'

const supportedSounds = new Map([
    [SupportedSound.QUACK, new Tone.ToneAudioBuffer('/sounds/quack.mp3')],
    [SupportedSound.DICE_ROLL, new Tone.ToneAudioBuffer('/sounds/dice_roll.mp3')],
    [SupportedSound.ERROR, new Tone.ToneAudioBuffer('/sounds/error.mp3')],
    [SupportedSound.HYPERLIKE, new Tone.ToneAudioBuffer('/sounds/hyperlike.mp3')],
    [SupportedSound.SHOOT, new Tone.ToneAudioBuffer('/sounds/shoot.mp3')],
    [SupportedSound.WHISTLE, new Tone.ToneAudioBuffer('/sounds/whistle.mp3')],
    [SupportedSound.POUFFF, new Tone.ToneAudioBuffer('/sounds/poufff.mp3')],
    [SupportedSound.APPLAUSE, new Tone.ToneAudioBuffer('/sounds/applause.mp3')],
    [SupportedSound.TICK, new Tone.ToneAudioBuffer('/sounds/tick.mp3')]
])
const supportedMusics = new Map([
    [SupportedMusic.MAIN, new Tone.ToneAudioBuffer('/music/Ken_Hamm-Buckbreak.mp3')]
])
const interfaceGateway = new SvelteAndToneInterfaceGateway(supportedSounds, supportedMusics)
const eventGateway = new InMemoryProductionEventGateway()
const chatGateway = new TwitchChatGateway(eventGateway)
const cleavageRepository = new InMemoryCleavageRepository()
const applicationGateways:ProductionApplicationGateways = { chat: chatGateway, event: eventGateway, interface: interfaceGateway }
const applicationRepositories:ProductionApplicationRepositories = { cleavage: cleavageRepository }
export const application = new ProductionApplication(applicationGateways, applicationRepositories)
