import type { BarRepository } from '../../../domain/ports/secondary/repositories/BarRepository'
import type { Bar } from '../../../domain/entities/Bar'
import type { Table } from '../../../domain/tests/Table'
import { Direction } from '../../../domain/applicationServices/Direction'
import type { Stool } from '../../../domain/entities/Stool'
import type { OccupiedStool } from '../../../domain/applicationServices/BarApplicationService'

export class InMemoryBarRepository implements BarRepository {
    addAvailableBarStool (stool: Stool): Promise<void> {
        this.availableBarStools.push(stool)
        return Promise.resolve()
    }

    installBar (bar: Bar): Promise<void> {
        this.bar = bar
        return Promise.resolve()
    }

    freeBarStool (username: string): Promise<void> {
        const barStool = this.occupiedBarStools.get(username)
        if (!barStool) return Promise.reject(new Error(`Occupied bar stool with user ${username} not found.`))
        this.occupiedBarStools.delete(username)
        this.availableBarStools.push(barStool)
        return Promise.resolve()
    }

    nextOccupiedBarStool (): Promise<OccupiedStool|undefined> {
        const username = [...this.occupiedBarStools.keys()].at(0)
        const occupiedBarStool = username ? this.occupiedBarStools.get(username) : undefined
        return (username && occupiedBarStool)
            ? Promise.resolve({ username: username, stool: occupiedBarStool })
            : Promise.resolve(undefined)
    }

    retrieveTableById (tableId: string): Promise<Table> {
        const table = this.tables.find(table => table.id === tableId)
        return table
            ? Promise.resolve(table)
            : Promise.reject(new Error(`Table with id '${tableId}' missing on ${this.constructor.name}`))
    }

    addAvailableTableStool (stool: Stool):Promise<void> {
        this.availableTableStools.push(stool)
        return Promise.resolve()
    }

    updateTableDirection (direction: Direction) {
        this.tableDirection = direction
        return Promise.resolve()
    }

    retreiveTableDirection (): Promise<Direction> {
        return Promise.resolve(this.tableDirection)
    }

    retrieveBar (): Promise<Bar> {
        return Promise.resolve(this.bar)
    }

    retrieveTables (): Promise<Table[]> {
        return Promise.resolve(this.tables)
    }

    addTable (table: Table): Promise<void> {
        this.tables.push(table)
        return Promise.resolve()
    }

    setOccupiedBarStool (username: any, stool: Stool) {
        this.occupiedBarStools.set(username, stool)
        return Promise.resolve()
    }

    setOccupiedTableStool (username: string, stool: Stool) {
        this.occupiedTableStools.set(username, stool)
        return Promise.resolve()
    }

    nextAvailableTableStool (): Promise<Stool> {
        const nextAvailableStool = this.availableTableStools.shift()
        return nextAvailableStool
            ? Promise.resolve(nextAvailableStool)
            : Promise.reject(new Error('No table stool available.'))
    }

    nextAvailableBarStool (): Promise<Stool> {
        const nextAvailableBarStool = this.availableBarStools.shift()
        return nextAvailableBarStool
            ? Promise.resolve(nextAvailableBarStool)
            : Promise.reject(new Error('No bar stool available.'))
    }

    hasAvailableTableStool (): Promise<boolean> {
        return Promise.resolve(this.availableTableStools.length > 0)
    }

    hasAvailableBarStool (): Promise<boolean> {
        return Promise.resolve(this.availableBarStools.length > 0)
    }

    availableTableStools: Stool[] = []
    occupiedTableStools: Map<string, Stool> = new Map()
    availableBarStools: Stool[] = []
    occupiedBarStools: Map<string, Stool> = new Map()
    tables: Table[] = []
    tableDirection: Direction = Direction.RIGHT
    bar: Bar = { id: '0', position: { x: 0, y: 0 }, size: { height: 0, width: 0 } }
}
