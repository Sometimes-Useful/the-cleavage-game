import { Application } from 'pixi.js'
import * as Tone from 'tone'
import { SupportedMusic } from './domain/entities/music/SupportedMusic'
import { SupportedSound } from './domain/entities/SoundType'
import { SpriteType } from './domain/entities/SpriteType'
import type { VideoExtract } from './domain/entities/VideoExtract'
import type { ProductionClientApplicationGateways } from './domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionClientApplicationRepositories } from './domain/ports/secondary/repositories/ApplicationRepositories'
import { clientBackendFqdn, clientBackendPort, clientBackendSheme } from './env/clientEnvironnementVariables'
import { ProductionClientApplication } from './infra/applications/client/ProductionApplication'
import { TwitchChatGateway } from './infra/gateways/chat/TwitchChatGateway'
import { ProductionDateGateway } from './infra/gateways/date/ProductionDateGateway'
import { InMemoryProductionClientEventGateway } from './infra/gateways/event/InMemoryProductionClientEventGateway'
import { AxiosGlobalCleavageDrawPileGateway } from './infra/gateways/globalCleavageDrawPile/AxiosGlobalCleavageDrawPileGateway'
import { SvelteTonePixiInterfaceGateway } from './infra/gateways/interface/SvelteTonePixiInterfaceGateway'
import { ProductionRandomGateway } from './infra/gateways/random/ProductionRandomGateway'
import { AxiosStreamersGateway } from './infra/gateways/streamers/AxiosStreamersGateway'
import { ProductionUuidGateway } from './infra/gateways/uuid/ProductionUuidGateway'
import { InMemoryAutoplayRepository } from './infra/repositories/autoplay/InMemoryAutoplayRepository'
import { InMemoryBarRepository } from './infra/repositories/bar/InMemoryBarRepository'
import { InMemoryCurrentCleavageRepository } from './infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import { InMemoryGamePhaseRepository } from './infra/repositories/gamePhase/InMemoryGamePhaseRepository'
import { InMemoryPlayerRepository } from './infra/repositories/player/InMemoryPlayerRepository'
import { InMemoryPublicCleavageDrawPileRepository } from './infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import { InMemoryVideoExtractRepository } from './infra/repositories/videoExtract/InMemoryVideoExtractRepository'
import { AxiosBackendInstance } from './infra/tech/AxiosBackendInstance'

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

const spriteAssets:Map<SpriteType, string> = new Map([
    [SpriteType.BAR, '/textures/bar.png'],
    [SpriteType.STOOL, '/textures/stool.png'],
    [SpriteType.PLAYER, '/textures/player.png'],
    [SpriteType.TABLE, '/textures/table.png']
])

const pixiApplication = new Application()

const interfaceGateway = new SvelteTonePixiInterfaceGateway(supportedSounds, supportedMusics, pixiApplication, spriteAssets)
const eventGateway = new InMemoryProductionClientEventGateway()
const chatGateway = new TwitchChatGateway(eventGateway)
const randomGateway = new ProductionRandomGateway()
const dateGateway = new ProductionDateGateway()
const uuidGateway = new ProductionUuidGateway()
const axiosBackendInstance = new AxiosBackendInstance((clientBackendSheme && clientBackendFqdn) ? { sheme: clientBackendSheme, endpoint: clientBackendFqdn, port: clientBackendPort } : undefined)
const globalCleavageDrawPileGateway = new AxiosGlobalCleavageDrawPileGateway(axiosBackendInstance)
const streamersGateway = new AxiosStreamersGateway(axiosBackendInstance)

const applicationGateways:ProductionClientApplicationGateways = {
    streamers: streamersGateway,
    chat: chatGateway,
    event: eventGateway,
    interface: interfaceGateway,
    random: randomGateway,
    date: dateGateway,
    globalCleavageDrawPile: globalCleavageDrawPileGateway,
    uuid: uuidGateway
}
const videoExtracts:VideoExtract[] = [
    { choice: 'Gôche', percentage: 100, youtubeVideoId: '6Q5-qVUMqfQ' },
    { choice: 'Gôche', percentage: 90, youtubeVideoId: 'zRunanIYOp4', startExtractSeconds: 0, endExtractSeconds: 8.2 },
    { choice: 'Gôche', percentage: 85, youtubeVideoId: 'kpFzztF1ozo', startExtractSeconds: 0, endExtractSeconds: 45 },
    { choice: 'Gôche', percentage: 80, youtubeVideoId: 'BJFPfTNwILo', startExtractSeconds: 68.2, endExtractSeconds: 79.8 },
    { choice: 'Gôche', percentage: 60, youtubeVideoId: '_szmuSYsBVo', startExtractSeconds: 106.4, endExtractSeconds: 120.7 },
    { choice: 'Gôche', percentage: 55, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 45.3, endExtractSeconds: 58.8 },
    { choice: 'Drouate', percentage: 100, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 245, endExtractSeconds: 250.3 },
    { choice: 'Drouate', percentage: 95, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 340, endExtractSeconds: 352.5 },
    { choice: 'Drouate', percentage: 90, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 182, endExtractSeconds: 185.2 },
    { choice: 'Drouate', percentage: 85, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 591, endExtractSeconds: 599.8 },
    { choice: 'Drouate', percentage: 83, youtubeVideoId: 'b2LX-yz7iWw', startExtractSeconds: 103.7, endExtractSeconds: 112.6 },
    { choice: 'Drouate', percentage: 82, youtubeVideoId: 'eKtXIePYoTY', startExtractSeconds: 209.9, endExtractSeconds: 219.8 },
    { choice: 'Drouate', percentage: 80, youtubeVideoId: 'tab9tkIGmTQ' },
    { choice: 'Drouate', percentage: 77, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 181.2, endExtractSeconds: 190 },
    { choice: 'Drouate', percentage: 78, youtubeVideoId: 'Yn1aa5ICqVg', startExtractSeconds: 145, endExtractSeconds: 154.7 },
    { choice: 'Drouate', percentage: 60, youtubeVideoId: 'u9OQJa8fPZ4', startExtractSeconds: 93.7, endExtractSeconds: 108 },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'vSYVilGoFkU' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'OIwF3y1MuHI' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'NutaRBYWu6g' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'DCIQGLaWDzE' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'jS8ws01T6m0' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 274, endExtractSeconds: 277.2 },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 362.6, endExtractSeconds: 367 },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'MZPyBG-wPKY' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'aPpkxg-KDik' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'ZwHZki1T7So' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'wV4wepiucf4' },
    { choice: 'equality', percentage: 50, youtubeVideoId: '3w5cwBrvtf4' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'FpAisqJ6IZc' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'Wgwp0waFRxA' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'cYcRAeRHPdw', startExtractSeconds: 4.71, endExtractSeconds: 5.29 },
    { choice: 'Non', percentage: 100, youtubeVideoId: 'aEgL1yNlxRw', startExtractSeconds: 103.4, endExtractSeconds: 108.15 },
    { choice: 'Oui', percentage: 60, youtubeVideoId: 'mEZR-BvCDWI', startExtractSeconds: 32.2, endExtractSeconds: 34 },
    { choice: 'Oui', percentage: 65, youtubeVideoId: 'EzgmZ3shjKk' },
    { choice: 'Oui', percentage: 70, youtubeVideoId: 'cyQtMZBZJlk', startExtractSeconds: 415.5, endExtractSeconds: 421.5 },
    { choice: 'Macron', percentage: 100, youtubeVideoId: '5m_flTU0OpA', startExtractSeconds: 30, endExtractSeconds: 37.9 },
    { choice: 'Méluch', percentage: 100, youtubeVideoId: '71MJihqN6ww', startExtractSeconds: 69, endExtractSeconds: 82.7 },
    { choice: 'Gentille', percentage: 100, youtubeVideoId: 'ehohes_3sOQ', startExtractSeconds: 127.2, endExtractSeconds: 134.5 },
    { choice: 'Babacool', percentage: 100, youtubeVideoId: 'nQAdYNB8nXU', startExtractSeconds: 18.6, endExtractSeconds: 24.3 },
    { choice: 'Reptilien', percentage: 100, youtubeVideoId: 'sWSxzADSvQ0', startExtractSeconds: 1084.6, endExtractSeconds: 1102.2 },
    { choice: 'Tellement bon!', percentage: 100, youtubeVideoId: 'xchGAzcDNlw', startExtractSeconds: 14.6, endExtractSeconds: 19.5 },
    { choice: 'Oh que non!', percentage: 80, youtubeVideoId: 'aEgL1yNlxRw', startExtractSeconds: 103.4, endExtractSeconds: 108.1 }
    /* { choice: 'Macron', percentage: 100, youtubeVideoId: 'dfgdfgg' },
    { choice: 'Méluch', percentage: 100, youtubeVideoId: 'dfgdfg' },
    { choice: 'Tellement bon!', percentage: 100, youtubeVideoId: 'dfgdfg' },
    { choice: 'Oh que non!', percentage: 100, youtubeVideoId: 'dfgdf' },
    { choice: 'Non', percentage: 100, youtubeVideoId: 'dfgfdg' },
    { choice: 'Oui', percentage: 100, youtubeVideoId: 'f7FjTKBQutY' },
    { choice: 'Gentille', percentage: 100, youtubeVideoId: 'dfgdfgdf' },
    { choice: 'Méchante', percentage: 100, youtubeVideoId: 'dfgdf' },
    { choice: 'equality', percentage: 100, youtubeVideoId: 'dfgdfgdfg' } */
]

const videoExtractRepository = new InMemoryVideoExtractRepository()
videoExtractRepository.videoExtracts = videoExtracts
const applicationRepositories:ProductionClientApplicationRepositories = {
    videoExtracts: videoExtractRepository,
    publicCleavageDrawPile: new InMemoryPublicCleavageDrawPileRepository(),
    currentCleavage: new InMemoryCurrentCleavageRepository(),
    player: new InMemoryPlayerRepository(),
    autoplay: new InMemoryAutoplayRepository(),
    gamePhase: new InMemoryGamePhaseRepository(),
    bar: new InMemoryBarRepository()
}

export const clientApplication = new ProductionClientApplication(applicationGateways, applicationRepositories)
