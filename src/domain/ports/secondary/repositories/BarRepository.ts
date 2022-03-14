import type { Bar } from '../../../entities/Bar'
import type { Table } from '../../../tests/Table'
import type { Direction } from '../../../applicationServices/Direction'
import type { Stool } from '../../../entities/Stool'
import type { OccupiedStool } from '../../../applicationServices/BarApplicationService'

export interface BarRepository {
    installBar(bar:Bar): Promise<void>
    freeBarStool(username: string):Promise<void>
    nextOccupiedBarStool(): Promise<OccupiedStool|undefined>
    retrieveTableById(tableId: string):Promise<Table>
    addAvailableTableStool(stool: Stool):Promise<void>
    addAvailableBarStool(stool: Stool): Promise<void>
    updateTableDirection(direction: Direction): Promise<void>
    retreiveTableDirection(): Promise<Direction>
    retrieveBar(): Promise<Bar>
    retrieveTables():Promise<Table[]>;
    addTable(table1: Table): Promise<void>;
    setOccupiedBarStool(username: any, stool: Stool): Promise<void>;
    setOccupiedTableStool(username: string, stool: Stool): Promise<void>;
    hasAvailableBarStool():Promise<boolean>;
    nextAvailableTableStool():Promise<Stool>;
    nextAvailableBarStool(): Promise<Stool>;
    hasAvailableTableStool(): Promise<boolean>;
}
