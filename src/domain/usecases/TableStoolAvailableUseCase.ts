import type { BarApplicationService, OccupiedStool } from '../applicationServices/BarApplicationService'
import type { TableStoolAvailableEvent } from '../events/tableStoolAvailable/TableStoolAvailableEvent'
import { UseCase } from './UseCase'

interface TableStoolAvailableUseCaseApplicationService {
    bar: BarApplicationService

}

export class TableStoolAvailableUseCase extends UseCase {
    constructor (private applicationServices:TableStoolAvailableUseCaseApplicationService) { super() }
    execute (event: TableStoolAvailableEvent): Promise<void> {
        return this.applicationServices.bar.nextOccupiedBarStool()
            .then(occupiedBarStool => occupiedBarStool ? this.onOccupiedBarStool(occupiedBarStool) : undefined)
            .catch(error => Promise.reject(error))
    }

    private onOccupiedBarStool (occupiedStool: OccupiedStool): Promise<void> {
        return this.applicationServices.bar.hasAvailableTableStool()
            .then(isTableStoolAvailable => isTableStoolAvailable ? this.applicationServices.bar.onOccupiedBarStool(occupiedStool) : this.applicationServices.bar.askForNewTable())
            .catch(error => Promise.reject(error))
    }
}
