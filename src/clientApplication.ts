import * as Tone from 'tone'
import { SupportedMusic } from './domain/entities/music/SupportedMusic'
import { ProductionClientApplication } from './infra/applications/client/ProductionApplication'
import { TwitchChatGateway } from './infra/gateways/chat/TwitchChatGateway'
import { InMemoryPlayerRepository } from './infra/repositories/player/InMemoryPlayerRepository'
import { InMemoryCurrentCleavageRepository } from './infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import { SupportedSound } from './domain/entities/SoundType'
import type { ProductionClientApplicationGateways } from './domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionClientApplicationRepositories } from './domain/ports/secondary/repositories/ApplicationRepositories'
import { InMemoryPublicCleavageDrawPileRepository } from './infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import { ProductionRandomGateway } from './infra/gateways/random/ProductionRandomGateway'
import { InMemoryAutoplayRepository } from './infra/repositories/autoplay/InMemoryAutoplayRepository'
import { ProductionDateGateway } from './infra/gateways/date/ProductionDateGateway'
import { InMemoryProductionClientEventGateway } from './infra/gateways/event/InMemoryProductionClientEventGateway'
import { AxiosGlobalCleavageDrawPileGateway } from './infra/gateways/globalCleavageDrawPile/AxiosGlobalCleavageDrawPileGateway'
import { clientBackendFqdn, clientBackendPort, clientBackendSheme } from './env/clientEnvironnementVariables'
import { InMemoryBarRepository } from './infra/repositories/bar/InMemoryBarRepository'
import { InMemoryGamePhaseRepository } from './infra/repositories/gamePhase/InMemoryGamePhaseRepository'
import { ProductionUuidGateway } from './infra/gateways/uuid/ProductionUuidGateway'
import { SvelteTonePixiInterfaceGateway } from './infra/gateways/interface/SvelteTonePixiInterfaceGateway'

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

const interfaceGateway = new SvelteTonePixiInterfaceGateway(supportedSounds, supportedMusics)
const eventGateway = new InMemoryProductionClientEventGateway()
const chatGateway = new TwitchChatGateway(eventGateway)
const randomGateway = new ProductionRandomGateway()
const dateGateway = new ProductionDateGateway()
const globalCleavageDrawPileGateway = new AxiosGlobalCleavageDrawPileGateway(clientBackendSheme, clientBackendFqdn, clientBackendPort)
const uuidGateway = new ProductionUuidGateway()

const applicationGateways:ProductionClientApplicationGateways = {
    chat: chatGateway,
    event: eventGateway,
    interface: interfaceGateway,
    random: randomGateway,
    date: dateGateway,
    globalCleavageDrawPile: globalCleavageDrawPileGateway,
    uuid: uuidGateway
}

const applicationRepositories:ProductionClientApplicationRepositories = {
    publicCleavageDrawPile: new InMemoryPublicCleavageDrawPileRepository(),
    currentCleavage: new InMemoryCurrentCleavageRepository(),
    player: new InMemoryPlayerRepository(),
    autoplay: new InMemoryAutoplayRepository(),
    gamePhase: new InMemoryGamePhaseRepository(),
    bar: new InMemoryBarRepository()
}

export const clientApplication = new ProductionClientApplication(applicationGateways, applicationRepositories)
