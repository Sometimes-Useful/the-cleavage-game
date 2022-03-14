import type { BarApplicationService } from '../applicationServices/BarApplicationService'
import type { InstallNewStoolsOnBarEvent } from '../events/installNewStoolOnBar/InstallNewStoolsOnBarEvent'
import { UseCase } from './UseCase'

interface InstallNewStoolsOnBarUseCaseApplicationServices {
    bar:BarApplicationService
}

export class InstallNewStoolsOnBarUseCase extends UseCase {
    constructor (private applicationServices:InstallNewStoolsOnBarUseCaseApplicationServices) { super() }
    execute (event: InstallNewStoolsOnBarEvent): Promise<void> {
        return this.applicationServices.bar.installStoolForBar()
    }
}
