import { UseCase } from './UseCase'
import type { InstallNewTableEvent } from '../events/installNewTable/InstallNewTableEvent'
import type { BarApplicationService } from '../applicationServices/BarApplicationService'

interface InstallNewTableUseCaseApplicationService {
    bar:BarApplicationService
}

export class InstallNewTableUseCase extends UseCase {
    constructor (private applicationServices: InstallNewTableUseCaseApplicationService) { super() }
    execute (event: InstallNewTableEvent): Promise<void> {
        return this.applicationServices.bar.installNewTable()
    }
}
