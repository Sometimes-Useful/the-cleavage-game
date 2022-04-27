import { Cleavage } from '../entities/Cleavage'
import { Player } from '../entities/Player'
import type { Position } from '../entities/Position'
import type { Bar } from '../entities/Bar'
import type { Size } from '../entities/Size'
import type { Table } from './Table'
import type { Stool } from '../entities/Stool'
import { VideoExtract } from '../entities/VideoExtract'

export const oui100VideoExtract = new VideoExtract('Oui', 100, 'pAy3-A_VWRY')
export const non100VideoExtract = new VideoExtract('Non', 100, 'caXgpo5Ezo4')
export const oui60VideoExtract = new VideoExtract('Oui', 60, 'f7FjTKBQutY')
export const egalite50VideoExtract = new VideoExtract('equality', 50, 'f7FjTKBQutY')
export const egalite50VideoExtract2 = new VideoExtract('equality', 50, 'RqJVa0fl01w')
export const defaultPlayerSize:Size = { width: 0.6, height: 0.8 }
export const player1 = (position?:Position) => new Player({ username: 'Billy', position, size: defaultPlayerSize })
export const player2 = (position?:Position) => new Player({ username: 'Bob', position, size: defaultPlayerSize })
export const player3 = (position?:Position) => new Player({ username: 'Henry', position, size: defaultPlayerSize })
export const player4 = (position?:Position) => new Player({ username: 'Stéphanie', position, size: defaultPlayerSize })
export const cleavageTitle1 = 'Les mouchoirs en tissu'
export const cleavageTitle2 = 'Les glaciers de l\'Ile d\'Oléron'
export const integrationTestMessage = 'Integration Test Message'
export const username = 'Ben'
export const token = 'f6s53d4gsd3f4sddfd'
export const channel = 'BenChannel'
export const positionBar:Position = { x: 0, y: 0 }
export const barSize:Size = { height: 6.8, width: 8.2 }
export const position1:Position = { x: 0, y: 0 }
export const position2:Position = { x: 1, y: 1 }
export const gocheChoice = (players:string[] = []) => ({ name: 'Gôche', players })
export const drouateChoice = (players:string[] = []) => ({ name: 'Drouate', players })
export const commonCleavage1 = () => new Cleavage({ title: cleavageTitle1, leftChoice: gocheChoice(), rightChoice: drouateChoice(), players: [] })
export const commonCleavage2 = () => new Cleavage({ title: cleavageTitle2, leftChoice: gocheChoice(), rightChoice: drouateChoice(), players: [] })
export const bar:Bar = { id: 'bar', position: positionBar, size: barSize }
const tableSize:Size = {
    width: 2.4,
    height: 0.8
}
export const table1:Table = { id: 'table1', position: { x: -0.2, y: -2 }, size: tableSize }
export const table2:Table = { id: 'table2', position: { x: 2.9, y: -2 }, size: tableSize }
export const table3:Table = { id: 'table3', position: { x: 6, y: -2 }, size: tableSize }
export const table4:Table = { id: 'table4', position: { x: 9.1, y: -2 }, size: tableSize }
export const table5:Table = { id: 'table5', position: { x: 9.1, y: 0 }, size: tableSize }
export const table6:Table = { id: 'table6', position: { x: 9.1, y: 2 }, size: tableSize }
export const table7:Table = { id: 'table7', position: { x: 9.1, y: 4 }, size: tableSize }
export const table8:Table = { id: 'table8', position: { x: 9.1, y: 6 }, size: tableSize }
export const table9:Table = { id: 'table9', position: { x: 9.1, y: 8 }, size: tableSize }
export const table10:Table = { id: 'table10', position: { x: 6, y: 8 }, size: tableSize }
export const table11:Table = { id: 'table11', position: { x: 2.9, y: 8 }, size: tableSize }
export const table12:Table = { id: 'table12', position: { x: -0.2, y: 8 }, size: tableSize }
export const table13:Table = { id: 'table13', position: { x: -3.3, y: 8 }, size: tableSize }
export const table14:Table = { id: 'table14', position: { x: -3.3, y: 6 }, size: tableSize }
export const table15:Table = { id: 'table15', position: { x: -3.3, y: 4 }, size: tableSize }
export const table16:Table = { id: 'table16', position: { x: -3.3, y: 2 }, size: tableSize }
export const table17:Table = { id: 'table17', position: { x: -3.3, y: 0 }, size: tableSize }
export const table18:Table = { id: 'table18', position: { x: -3.3, y: -2 }, size: tableSize }
export const table19:Table = { id: 'table19', position: { x: -3.3, y: -4 }, size: tableSize }
export const table20:Table = { id: 'table20', position: { x: -0.2, y: -4 }, size: tableSize }
export const table21:Table = { id: 'table21', position: { x: 2.9, y: -4 }, size: tableSize }
export const table22:Table = { id: 'table22', position: { x: 6, y: -4 }, size: tableSize }
export const table23:Table = { id: 'table23', position: { x: 9.1, y: -4 }, size: tableSize }
export const table24:Table = { id: 'table24', position: { x: 12.2, y: -4 }, size: tableSize }
export const table25:Table = { id: 'table25', position: { x: 12.2, y: -2 }, size: tableSize }
export const table26:Table = { id: 'table26', position: { x: 12.2, y: 0 }, size: tableSize }
export const table27:Table = { id: 'table27', position: { x: 12.2, y: 2 }, size: tableSize }
export const table28:Table = { id: 'table28', position: { x: 12.2, y: 4 }, size: tableSize }
export const table29:Table = { id: 'table29', position: { x: 12.2, y: 6 }, size: tableSize }
export const table30:Table = { id: 'table30', position: { x: 12.2, y: 8 }, size: tableSize }
export const table31:Table = { id: 'table31', position: { x: 12.2, y: 10 }, size: tableSize }
export const table32:Table = { id: 'table32', position: { x: 9.1, y: 10 }, size: tableSize }
export const table33:Table = { id: 'table33', position: { x: 6, y: 10 }, size: tableSize }
export const table34:Table = { id: 'table34', position: { x: 2.9, y: 10 }, size: tableSize }
export const table35:Table = { id: 'table35', position: { x: -0.2, y: 10 }, size: tableSize }
export const table36:Table = { id: 'table36', position: { x: -3.3, y: 10 }, size: tableSize }
export const table37:Table = { id: 'table37', position: { x: -6.4, y: 10 }, size: tableSize }
export const table38:Table = { id: 'table38', position: { x: -6.4, y: 8 }, size: tableSize }
export const table39:Table = { id: 'table39', position: { x: -6.4, y: 6 }, size: tableSize }
export const table40:Table = { id: 'table40', position: { x: -6.4, y: 4 }, size: tableSize }
export const table41:Table = { id: 'table41', position: { x: -6.4, y: 2 }, size: tableSize }
export const table42:Table = { id: 'table42', position: { x: -6.4, y: 0 }, size: tableSize }
export const table43:Table = { id: 'table43', position: { x: -6.4, y: -2 }, size: tableSize }
export const table44:Table = { id: 'table44', position: { x: -6.4, y: -4 }, size: tableSize }
export const table45:Table = { id: 'table45', position: { x: -6.4, y: -6 }, size: tableSize }
export const table46:Table = { id: 'table46', position: { x: -3.3, y: -6 }, size: tableSize }
const stoolSize:Size = { height: 0.4, width: 0.4 }
export const stool1A:Stool = { id: 'stool1A', position: { x: 0, y: -2.4 }, size: stoolSize }
export const stool1B:Stool = { id: 'stool1B', position: { x: 0.8, y: -2.4 }, size: stoolSize }
export const stool1C:Stool = { id: 'stool1C', position: { x: 1.6, y: -2.4 }, size: stoolSize }
export const stool1D:Stool = { id: 'stool1D', position: { x: 0, y: -1.2 }, size: stoolSize }
export const stool1E:Stool = { id: 'stool1E', position: { x: 0.8, y: -1.2 }, size: stoolSize }
export const stool1F:Stool = { id: 'stool1F', position: { x: 1.6, y: -1.2 }, size: stoolSize }
export const stool46A:Stool = { id: 'stool46A', position: { x: -3.1, y: -6.4 }, size: stoolSize }
export const stool46B:Stool = { id: 'stool46B', position: { x: -2.3, y: -6.4 }, size: stoolSize }
export const stool46C:Stool = { id: 'stool46C', position: { x: -1.5, y: -6.4 }, size: stoolSize }
export const stool46D:Stool = { id: 'stool46D', position: { x: -3.1, y: -5.2 }, size: stoolSize }
export const stool46E:Stool = { id: 'stool46E', position: { x: -2.3, y: -5.2 }, size: stoolSize }
export const stool46F:Stool = { id: 'stool46F', position: { x: -1.5, y: -5.2 }, size: stoolSize }
export const stoolBarA:Stool = { id: 'stoolBarA', position: { x: 0.6, y: -0.4 }, size: stoolSize }
export const stoolBarB:Stool = { id: 'stoolBarB', position: { x: 1.4, y: -0.4 }, size: stoolSize }
export const stoolBarC:Stool = { id: 'stoolBarC', position: { x: 2.2, y: -0.4 }, size: stoolSize }
export const stoolBarD:Stool = { id: 'stoolBarD', position: { x: 3, y: -0.4 }, size: stoolSize }
export const stoolBarE:Stool = { id: 'stoolBarE', position: { x: 3.8, y: -0.4 }, size: stoolSize }
export const stoolBarF:Stool = { id: 'stoolBarF', position: { x: 4.6, y: -0.4 }, size: stoolSize }
export const stoolBarG:Stool = { id: 'stoolBarG', position: { x: 5.4, y: -0.4 }, size: stoolSize }
export const stoolBarH:Stool = { id: 'stoolBarH', position: { x: 6.2, y: -0.4 }, size: stoolSize }
export const stoolBarI:Stool = { id: 'stoolBarI', position: { x: 7, y: -0.4 }, size: stoolSize }
export const stoolBarJ:Stool = { id: 'stoolBarJ', position: { x: 0.6, y: 6.8 }, size: stoolSize }
export const stoolBarK:Stool = { id: 'stoolBarK', position: { x: 1.4, y: 6.8 }, size: stoolSize }
export const stoolBarL:Stool = { id: 'stoolBarL', position: { x: 2.2, y: 6.8 }, size: stoolSize }
export const stoolBarM:Stool = { id: 'stoolBarM', position: { x: 4.6, y: 6.8 }, size: stoolSize }
export const stoolBarN:Stool = { id: 'stoolBarN', position: { x: 5.4, y: 6.8 }, size: stoolSize }
export const stoolBarO:Stool = { id: 'stoolBarO', position: { x: 6.2, y: 6.8 }, size: stoolSize }
export const stoolBarP:Stool = { id: 'stoolBarP', position: { x: 7, y: 6.8 }, size: stoolSize }
export const barStools:Stool[] = [stoolBarA, stoolBarB, stoolBarC, stoolBarD, stoolBarE, stoolBarF, stoolBarG, stoolBarH, stoolBarI, stoolBarJ, stoolBarK, stoolBarL, stoolBarM, stoolBarN, stoolBarO, stoolBarP]
