import type { BarApplicationService } from '../applicationServices/BarApplicationService'
import type { CreateBarEvent } from '../events/createBar/CreateBarEvent'
import { UseCase } from './UseCase'

interface CreateBarUseCaseApplicationServices {
    bar: BarApplicationService
}

export class CreateBarUseCase extends UseCase {
    constructor (private applicationServices:CreateBarUseCaseApplicationServices) { super() }

    execute (event: CreateBarEvent): Promise<void> {
        return this.applicationServices.bar.installBar()
    }
}
