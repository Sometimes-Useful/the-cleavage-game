import * as Tone from 'tone'
import { SupportedMusic } from './domain/entities/music/SupportedMusic'
import { ProductionApplication } from './infra/applications/ProductionApplication'
import { TwitchChatGateway } from './infra/gateways/chat/TwitchChatGateway'
import { InMemoryProductionEventGateway } from './infra/gateways/event/InMemoryProductionEventGateway'
import { SvelteAndToneInterfaceGateway } from './infra/gateways/interface/SvelteAndToneInterfaceGateway'
import { InMemoryPlayerRepository } from './infra/repositories/player/InMemoryPlayerRepository'
import { InMemoryCurrentCleavageRepository } from './infra/repositories/currentCleavage/InMemoryCurrentCleavageRepository'
import { SupportedSound } from './domain/entities/SoundType'
import type { ProductionApplicationGateways } from './domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionApplicationRepositories } from './domain/ports/secondary/repositories/ApplicationRepositories'
import { InMemoryGlobalCleavageDrawPileRepository } from './infra/repositories/globalCleavageDrawPile/InMemoryGlobalCleavageRepository'
import { InMemoryPublicCleavageDrawPileRepository } from './infra/repositories/publicCleavageDrawPile/InMemoryPublicCleavageDrawPileRepository'
import { ProductionRandomGateway } from './infra/gateways/random/ProductionRandomGateway'
import { Cleavage } from './domain/entities/Cleavage'

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

const globalCleavages:Cleavage[] = [
    "Emmanuel Macron au PMU avec un p'tit blanc",
    'Un infirmier après son augmentation annuelle',
    "Le manager de l'équipe après s'être fait allumé par le CODIR",
    'Le vieux monsieur après 4 runs foirées sur Isaac',
    'Le prof de français en 5ème',
    'Pépé', 'Papy',
    'Mémé', 'Mamie',
    'Papa', 'Maman',
    "Ton mec une fois que tu l'as bien gonflé",
    "Ta meuf une fois que tu l'as énervé",
    "Toi quand ta meuf t'a énervé",
    'Ton enfant qui commande son plat au resto',
    'Gainsbourg',
    'Coluche',
    'Les concombres à la crème',
    'La raclette entre potes à la montagne en février',
    'Le maitre nageur à la piscine',
    'Le DRH',
    'Le stagiaire',
    "Robert Hue devant son relevé d'impots",
    'Les blues brothers (dans le premier film)',
    'Les fourmis',
    'Une mercedes',
    'Une renault',
    'Bernard Arnaud qui donne 10 balles à un SDF',
    'Le chat',
    'La choucroute',
    'La Suisse',
    'La Belgique',
    'Le service en porcelaine de belle maman',
    'Le cousin chiant',
    'Le tonton chiant',
    'La Gameboy'
].map(title => new Cleavage(title))

const interfaceGateway = new SvelteAndToneInterfaceGateway(supportedSounds, supportedMusics)
const eventGateway = new InMemoryProductionEventGateway()
const chatGateway = new TwitchChatGateway(eventGateway)
const randomGateway = new ProductionRandomGateway()
const applicationGateways:ProductionApplicationGateways = { chat: chatGateway, event: eventGateway, interface: interfaceGateway, random: randomGateway }

const publicCleavageDrawPileRepository = new InMemoryPublicCleavageDrawPileRepository()
const playerRepository = new InMemoryPlayerRepository()
const globalCleavageDrawPileRepository = new InMemoryGlobalCleavageDrawPileRepository(globalCleavages)
const currentCleavageRepository = new InMemoryCurrentCleavageRepository()
const applicationRepositories:ProductionApplicationRepositories = {
    publicCleavageDrawPile: publicCleavageDrawPileRepository,
    globalCleavageDrawPile: globalCleavageDrawPileRepository,
    currentCleavage: currentCleavageRepository,
    player: playerRepository
}
export const application = new ProductionApplication(applicationGateways, applicationRepositories)
