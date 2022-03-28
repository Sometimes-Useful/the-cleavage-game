import type { Bar } from '../entities/Bar'
import { InterfaceView } from '../entities/InterfaceView'
import type { Position } from '../entities/Position'
import type { Size } from '../entities/Size'
import type { Stool } from '../entities/Stool'
import { InstallNewStoolsOnBarEvent } from '../events/installNewStoolOnBar/InstallNewStoolsOnBarEvent'
import { DrawEvent } from '../events/draw/DrawEvent'
import { InstallNewTableEvent } from '../events/installNewTable/InstallNewTableEvent'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import { PlayerMoveEvent } from '../events/playerMove/PlayerMoveEvent'
import { PlayerQuitEvent } from '../events/playerQuit/PlayerQuitEvent'
import { TableStoolAvailableEvent } from '../events/tableStoolAvailable/TableStoolAvailableEvent'
import type { EventGatewaySecondary } from '../ports/secondary/gateways/EventGatewaySecondary'
import type { UuidGateway } from '../ports/secondary/gateways/UuidGateway'
import type { BarRepository } from '../ports/secondary/repositories/BarRepository'
import type { PhysicalEntity } from '../tests/PhysicalEntity'
import type { Table } from '../tests/Table'
import { Direction } from './Direction'
import { Sprite } from '../events/playerMove/Sprite'
import { GamePhase } from '../entities/GamePhase'
import { ChangeGamePhaseEvent } from '../events/changeGamePhase/ChangeGamePhaseEvent'
import { InstallNewStoolsOnTableEvent } from '../events/installNewStoolsOnTable/InstallNewStoolsOnTableEvent'

interface PostionAndDirection {
    position:Position,
    direction:Direction
}
export interface OccupiedStool {
    stool:Stool,
    username:string
}

export class BarApplicationService {
    installStoolForBar (): Promise<void> {
        const stools = this.makeBarStools()
        return Promise.all(stools.map(stool => this.uuidGateway.nextId()))
            .then(uuids => {
                uuids.forEach((uuid, index) => { stools[index].id = uuid })
                return Promise.all(stools.map(stool => this.barRepository.addAvailableBarStool(stool)))
            })
            .then(results => this.eventGateway.sendEvents(stools.map(stool => new DrawEvent(stool.id, { position: stool.position, sprite: Sprite.STOOL }))))
            .catch(error => Promise.reject(error))
    }

    makeBarStools ():Stool[] {
        const barStools:Stool[] = []
        for (let stoolColumnIndex = 0; stoolColumnIndex < 2; stoolColumnIndex++)
            for (let stoolIndex = 0; stoolIndex < 9; stoolIndex++) {
                const isStoolOnBarExit = stoolColumnIndex !== 0 && (stoolIndex === 3 || stoolIndex === 4)
                if (isStoolOnBarExit) continue
                barStools.push({
                    id: '',
                    size: { width: this.stoolDiameter, height: this.stoolDiameter },
                    position: {
                        x: this.precisionRound(this.firstStoolOffset.x + stoolIndex * 0.8, 3),
                        y: this.precisionRound(this.firstStoolOffset.y + (stoolColumnIndex === 0 ? 0 : 7.2), 3)
                    }
                })
            }
        return barStools
    }

    installBar (): Promise<void> {
        return this.uuidGateway.nextId()
            .then(uuid => this.onBarUuid(uuid))
            .catch(error => Promise.reject(error))
    }

    private onBarUuid (uuid: string): Promise<void> {
        return this.barRepository.installBar({
            position: this.defaultBarPosition,
            size: this.defaultBarSize,
            id: uuid
        })
            .then(() => this.eventGateway.sendEvents([
                new InstallNewStoolsOnBarEvent(),
                new DrawEvent(uuid, { position: this.defaultBarPosition, sprite: Sprite.BAR }),
                new NavigateEvent(InterfaceView.GAME),
                new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE)
            ]))
            .catch(error => Promise.reject(error))
    }

    askForNewTable (): Promise<void> {
        return this.eventGateway.sendEvent(new InstallNewTableEvent())
    }

    constructor (
        private barRepository:BarRepository,
        private eventGateway:EventGatewaySecondary,
        private uuidGateway: UuidGateway
    ) {}

    installPlayerFromBarStoolToTableStool (occupiedStool: OccupiedStool): Promise<void> {
        return this.barRepository.freeBarStool(occupiedStool.username)
            .then(() => this.barRepository.nextAvailableTableStool())
            .then(tableStool => this.occupyTableStool(tableStool, occupiedStool.username))
            .catch(error => Promise.reject(error))
    }

    private occupyTableStool (tableStool: Stool, username: string): Promise<void> {
        return this.barRepository.setOccupiedTableStool(username, tableStool)
            .then(() => this.eventGateway.sendEvent(new PlayerMoveEvent(username, tableStool.position)))
            .catch(error => Promise.reject(error))
    }

    nextOccupiedBarStool (): Promise<OccupiedStool|undefined> {
        return this.barRepository.nextOccupiedBarStool()
    }

    installStoolForTable (tableId: string): Promise<void> {
        return this.barRepository.retrieveTableById(tableId)
            .then(table => this.stoolsForTable(table))
            .then(stools => this.onStoolsForTable(stools))
            .catch(error => Promise.reject(error))
    }

    installNewTable (): Promise<void> {
        return Promise.all([
            this.barRepository.retrieveTables(),
            this.barRepository.retrieveBar(),
            this.barRepository.retreiveTableDirection(),
            this.uuidGateway.nextId()
        ])
            .then(([tables, bar, direction, uuid]) => {
                return tables.length > 0
                    ? this.onTables(uuid, tables, bar, direction)
                    : this.installTable({ id: uuid, size: this.tableSize, position: this.firstTablePosition })
            })
            .catch(error => Promise.reject(error))
    }

    private onStoolsForTable (stools: Stool[]): Promise<void> {
        return Promise.all(stools.map(stool => this.barRepository.addAvailableTableStool(stool)))
            .then(results => this.eventGateway.sendEvent(new TableStoolAvailableEvent()))
            .catch(error => Promise.reject(error))
    }

    private stoolsForTable (table: Table):Promise<Stool[]> {
        const tableStoolsPromise:Promise<Stool>[] = []

        for (let tableStoolRow = 1; tableStoolRow <= this.stoolRowsPerTables; tableStoolRow++)
            for (let stoolIndexOnRow = 0; stoolIndexOnRow < this.stoolsPerStoolRow; stoolIndexOnRow++)
                tableStoolsPromise.push(this.makeStool(table, tableStoolRow, stoolIndexOnRow))
        return Promise.all(tableStoolsPromise)
    }

    private makeStool (table:Table, tableStoolRow:number, stoolIndexOnRaw:number): Promise<Stool> {
        return this.uuidGateway.nextId()
            .then(uuid => ({
                id: uuid,
                size: { width: this.stoolDiameter, height: this.stoolDiameter },
                position: this.stoolPosition(table, tableStoolRow, stoolIndexOnRaw)
            }))
            .catch(error => Promise.reject(error))
    }

    private stoolPosition (table:Table, tableStoolRow:number, stoolIndexOnRaw:number):Position {
        return {
            x: this.precisionRound(table.position.x + (this.stoolDiameter / 2 + stoolIndexOnRaw * this.stoolDiameter * 2), 3),
            y: this.precisionRound(table.position.y + (tableStoolRow % 2 === 0 ? this.stoolDiameter * 2 : -this.stoolDiameter), 3)
        }
    }

    private onTables (uuid: string, tables: Table[], bar: Bar, direction: Direction): Promise<void> {
        return this.newTablePositionAndDirection(tables, bar, direction)
            .then(({ position, direction }) => Promise.all([
                this.installTable({ id: uuid, position, size: this.tableSize }),
                this.barRepository.updateTableDirection(direction)
            ]))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private newTablePositionAndDirection (tables: Table[], bar: Bar, direction:Direction):Promise<PostionAndDirection> {
        const noXOffset = 0
        const noYOffset = 0
        interface CheckCollisionAndDirection {
            isNoCollision:()=>Boolean,
            direction:Direction
        }
        const lastTable = tables[tables.length - 1]
        const changeDirectionStrategy:Map<Direction, CheckCollisionAndDirection> = new Map([
            [Direction.UP, { isNoCollision: () => this.isNoCollision(lastTable, [bar, ...tables], this.defaultTableHorizontalOffset, noYOffset), direction: Direction.RIGHT }],
            [Direction.RIGHT, { isNoCollision: () => this.isNoCollision(lastTable, [bar, ...tables], noXOffset, this.defaultTableVerticalOffset), direction: Direction.DOWN }],
            [Direction.DOWN, { isNoCollision: () => this.isNoCollision(lastTable, [bar, ...tables], -this.defaultTableHorizontalOffset, noYOffset), direction: Direction.LEFT }],
            [Direction.LEFT, { isNoCollision: () => this.isNoCollision(lastTable, [bar, ...tables], noXOffset, -this.defaultTableVerticalOffset), direction: Direction.UP }]
        ])
        const positionStrategy : Map<Direction, Position> = new Map([
            [Direction.UP, { x: lastTable.position.x + noXOffset, y: lastTable.position.y - this.defaultTableVerticalOffset }],
            [Direction.RIGHT, { x: lastTable.position.x + this.defaultTableHorizontalOffset, y: lastTable.position.y + noYOffset }],
            [Direction.DOWN, { x: lastTable.position.x + noXOffset, y: lastTable.position.y + this.defaultTableVerticalOffset }],
            [Direction.LEFT, { x: lastTable.position.x - this.defaultTableHorizontalOffset, y: lastTable.position.y + noYOffset }]
        ])
        const changeDirection = changeDirectionStrategy.get(direction)
        if (!changeDirection) return Promise.reject(new Error(`Unsupported change direction strategy with direction ${direction}`))
        direction = changeDirection.isNoCollision() ? changeDirection.direction : direction
        const position = positionStrategy.get(direction)
        return position
            ? Promise.resolve({ position: { x: this.precisionRound(position.x, 3), y: this.precisionRound(position.y, 3) }, direction })
            : Promise.reject(new Error('Position undefined.'))
    }

    private precisionRound (number:number, precision:number):number {
        const factor = Math.pow(10, precision)
        return Math.round(number * factor) / factor
    }

    private isNoCollision (entity1: PhysicalEntity, entities: PhysicalEntity[], xOffsetEntity1:number, yOffsetEntity1:number):Boolean {
        const entity1Target:PhysicalEntity = {
            id: entity1.id,
            size: entity1.size,
            position: {
                x: this.precisionRound(entity1.position.x + xOffsetEntity1, 3),
                y: this.precisionRound(entity1.position.y + yOffsetEntity1, 3)
            }
        }
        for (const entity of entities) {
            const isOnX = entity1Target.position.x <= entity.position.x + entity.size.width && entity1Target.position.x + entity1Target.size.width >= entity.position.x
            const isOnY = entity1Target.position.y <= entity.position.y + entity.size.height && entity1Target.position.y + entity1Target.size.height >= entity.position.y
            // console.log(`${JSON.stringify(entity1Target)} ${JSON.stringify(entities)} ${isOnX} ${isOnY}`)
            if (isOnY && isOnX) return false
        }
        return true
    }

    private installTable (table:Table): Promise<void> {
        console.log(JSON.stringify(table))
        return this.barRepository.addTable(table)
            .then(() => this.eventGateway.sendEvent(new InstallNewStoolsOnTableEvent(table.id)))
            .catch(error => Promise.reject(error))
    }

    playerQuit (player:string): Promise<void> {
        return this.eventGateway.sendEvent(new PlayerQuitEvent(player))
    }

    installPlayerOnBarStool (username: string): Promise<void> {
        return this.barRepository.nextAvailableBarStool()
            .then(stool => Promise.all([
                this.barRepository.setOccupiedBarStool(username, stool),
                this.eventGateway.sendEvent(new PlayerMoveEvent(username, stool.position)),
                this.eventGateway.sendEvent(new InstallNewTableEvent())
            ]))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    installPlayerOnTableStool (username:string): Promise<void> {
        return this.barRepository.nextAvailableTableStool()
            .then(stool => Promise.all([
                this.barRepository.setOccupiedTableStool(username, stool),
                this.eventGateway.sendEvent(new PlayerMoveEvent(username, stool.position))
            ]))
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    hasAvailableTableStool ():Promise<boolean> {
        return this.barRepository.hasAvailableTableStool()
    }

    hasAvailableBarStool () {
        return this.barRepository.hasAvailableBarStool()
    }

    private readonly stoolRowsPerTables = 2
    private readonly stoolsPerStoolRow = 3
    private readonly stoolDiameter = 0.4
    private readonly defaultTableHorizontalOffset = 3.1
    private readonly defaultTableVerticalOffset = 2
    private readonly tableSize:Size = { height: 0.8, width: 2.4 }
    private readonly firstTablePosition = { x: -0.2, y: -2 }
    private readonly defaultBarPosition = { x: 0, y: 0 }
    private readonly defaultBarSize = { width: 8.2, height: 6.8 }
    private readonly firstStoolOffset:Position = { x: 0.6, y: -0.4 }
}
