import type { BarApplicationService, OccupiedStool } from '../applicationServices/BarApplicationService'
import type { TableStoolAvailableEvent } from '../events/tableStoolAvailable/TableStoolAvailableEvent'
import { UseCase } from './UseCase'

interface TableStoolAvailableUseCaseApplicationService {
    bar: BarApplicationService
}

export class TableStoolAvailableUseCase extends UseCase {
    constructor (private applicationServices:TableStoolAvailableUseCaseApplicationService) { super() }
    execute (event: TableStoolAvailableEvent): Promise<void> {
        return this.onEvent()
    }

    private onEvent (): Promise<void> {
        return this.applicationServices.bar.nextOccupiedBarStool()
            .then(occupiedBarStool => occupiedBarStool
                ? this.onOccupiedBarStool(occupiedBarStool)
                : Promise.resolve()
            )
            .catch(error => Promise.reject(error))
    }

    private onOccupiedBarStool (occupiedBarStool: OccupiedStool): Promise<void> {
        return this.applicationServices.bar.hasAvailableTableStool()
            .then(isTableStoolAvailable => isTableStoolAvailable
                ? this.onTableStoolAvailable(occupiedBarStool)
                : this.applicationServices.bar.askForNewTable()
            )
            .catch(error => Promise.reject(error))
    }

    private onTableStoolAvailable (occupiedBarStool: OccupiedStool): Promise<void> {
        return this.applicationServices.bar.installPlayerFromBarStoolToTableStool(occupiedBarStool)
            .then(() => this.onEvent())
            .catch(error => Promise.reject(error))
    }
}
