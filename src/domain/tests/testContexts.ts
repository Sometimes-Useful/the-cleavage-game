import { Cleavage } from '../entities/Cleavage'
import { Player } from '../entities/Player'

export const player1 = new Player({ username: 'Billy' })
export const player2 = new Player({ username: 'Bob' })
export const cleavageTitle1 = 'Les mouchoirs en tissu'
export const cleavageTitle2 = 'Les glaciers de l\'Ile d\'Oléron'
export const integrationTestMessage = 'Integration Test Message'
export const username = 'Ben'
export const token = 'f6s53d4gsd3f4sddfd'
export const channel = 'BenChannel'
export const gocheChoice = (players:Player[] = []) => ({ name: 'Gôche', players })
export const drouateChoice = (players:Player[] = []) => ({ name: 'Drouate', players })
export const commonCleavage1 = () => new Cleavage({ title: cleavageTitle1, leftChoice: gocheChoice(), rightChoice: drouateChoice(), players: [] })
export const commonCleavage2 = () => new Cleavage({ title: cleavageTitle2, leftChoice: gocheChoice(), rightChoice: drouateChoice(), players: [] })
