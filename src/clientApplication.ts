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
import { Application } from 'pixi.js'
import { SpriteType } from './domain/entities/SpriteType'
import { InMemoryVideoExtractRepository } from './infra/repositories/videoExtract/InMemoryVideoExtractRepository'
import type { VideoExtract } from './domain/entities/VideoExtract'

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
const videoExtracts:VideoExtract[] = [
    { choice: 'Gôche', percentage: 100, youtubeVideoId: '6Q5-qVUMqfQ' },
    { choice: 'Gôche', percentage: 90, youtubeVideoId: 'zRunanIYOp4', startExtractSeconds: 0, endExtractSeconds: 8 },
    { choice: 'Gôche', percentage: 80, youtubeVideoId: 'BJFPfTNwILo', startExtractSeconds: 68.2, endExtractSeconds: 79.8 },
    { choice: 'Gôche', percentage: 55, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 45.3, endExtractSeconds: 58.8 },
    { choice: 'Drouate', percentage: 100, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 240, endExtractSeconds: 245 },
    { choice: 'Drouate', percentage: 95, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 340, endExtractSeconds: 352.7 },
    { choice: 'Drouate', percentage: 90, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 182, endExtractSeconds: 185.2 },
    { choice: 'Drouate', percentage: 85, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 591, endExtractSeconds: 600 },
    { choice: 'Drouate', percentage: 80, youtubeVideoId: 'tab9tkIGmTQ' },
    { choice: 'Drouate', percentage: 77, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 181.2, endExtractSeconds: 190 },
    { choice: 'Drouate', percentage: 78, youtubeVideoId: 'Yn1aa5ICqVg', startExtractSeconds: 145, endExtractSeconds: 175 },
    { choice: 'Drouate', percentage: 75, youtubeVideoId: 'YBpfClfbf0Y', startExtractSeconds: 591, endExtractSeconds: 600 },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'h_XoaD35CXE' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'vSYVilGoFkU' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'OIwF3y1MuHI' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'NutaRBYWu6g' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'RKT_zJ1oKN0', startExtractSeconds: 0, endExtractSeconds: 20.6 },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'DCIQGLaWDzE' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'jS8ws01T6m0' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 274, endExtractSeconds: 277.2 },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'MZPyBG-wPKY' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'Fi1RkSesW-g', startExtractSeconds: 362.6, endExtractSeconds: 367 },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'aPpkxg-KDik' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'ZwHZki1T7So' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'wV4wepiucf4' },
    { choice: 'equality', percentage: 50, youtubeVideoId: '3w5cwBrvtf4' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'FpAisqJ6IZc' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'Wgwp0waFRxA' },
    { choice: 'equality', percentage: 50, youtubeVideoId: 'cYcRAeRHPdw', startExtractSeconds: 7.95, endExtractSeconds: 12.1 },
    { choice: 'Non', percentage: 80, youtubeVideoId: 'aEgL1yNlxRw', startExtractSeconds: 103.4, endExtractSeconds: 108.1 },
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
