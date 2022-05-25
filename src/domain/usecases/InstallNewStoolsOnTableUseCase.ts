import type { BarApplicationService } from '../applicationServices/BarApplicationService'
import type { InstallNewStoolsOnTableEvent } from '../events/installNewStoolsOnTable/InstallNewStoolsOnTableEvent'
import { UseCase } from './UseCase'

interface InstallNewStoolsOnTableUseCaseApplicationServices {
    bar: BarApplicationService

}

export class InstallNewStoolsOnTableUseCase extends UseCase {
    constructor (private applicationServices: InstallNewStoolsOnTableUseCaseApplicationServices) { super() }
    execute (event: InstallNewStoolsOnTableEvent): Promise<void> {
        return this.applicationServices.bar.installStoolForTable(event.tableId)
    }
}
