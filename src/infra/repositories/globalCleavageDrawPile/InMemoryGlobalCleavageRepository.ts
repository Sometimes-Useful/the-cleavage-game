import { Choice } from '../../../domain/entities/Choice'
import { Cleavage } from '../../../domain/entities/Cleavage'
import type { GlobalCleavageDrawPileRepository } from '../../../domain/ports/secondary/repositories/GlobalCleavageDrawPileRepository'

export class InMemoryGlobalCleavageDrawPileRepository implements GlobalCleavageDrawPileRepository {
    constructor (
        public cleavagesDrawPile: Cleavage[] = []
    ) {}

    retrieveGlobalCleavageByIndex (cleavageIndex: number) {
        const cleavage = this.cleavagesDrawPile[cleavageIndex]
        return cleavage ? Promise.resolve(cleavage) : Promise.reject(new Error(`No cleavage at index ${cleavageIndex}`))
    }

    globalCleavageQuantity (): Promise<number> {
        return Promise.resolve(this.cleavagesDrawPile.length)
    }

    save (cleavage: Cleavage): Promise<void> {
        this.cleavagesDrawPile.push(cleavage)
        return Promise.resolve()
    }

    hasCleavage (cleavage: Cleavage): Promise<boolean> {
        const hasCleavage = this.cleavagesDrawPile.some(globalCleavage => globalCleavage.title === cleavage.title)
        return Promise.resolve(hasCleavage)
    }
}
const defaultLeftChoice:Choice = new Choice({ name: 'Gôche', players: [] })
const defaultRightChoice:Choice = new Choice({ name: 'Drouate', players: [] })
export const globalCleavages:Cleavage[] = [
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
].map(title => new Cleavage({ title, leftChoice: defaultLeftChoice.toDTO(), rightChoice: defaultRightChoice.toDTO(), players: [] }))
