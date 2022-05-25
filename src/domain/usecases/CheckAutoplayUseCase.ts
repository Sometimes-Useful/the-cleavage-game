import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import type { ApplicationEvent } from '../events/GameEvent'
import { NewCleavageEvent } from '../events/newCleavage/NewCleavageEvent'
import { UseCase } from './UseCase'

interface CheckAutoplayUseCaseApplicationServices {
    event: EventApplicationService
    autoplay:AutoplayApplicationService
}

export class CheckAutoplayUseCase extends UseCase {
    constructor (
        private applicationServices:CheckAutoplayUseCaseApplicationServices
    ) { super() }

    execute (event: ApplicationEvent): Promise<void> {
        return this.applicationServices.autoplay.hasAutoplay()
            .then(hasAutoplay => hasAutoplay ? this.onAutoPlay() : Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onAutoPlay (): Promise<void> {
        return this.applicationServices.autoplay.isTimeForNextCleavage()
            .then(isTimeForNextCleavage => isTimeForNextCleavage
                ? this.onTimeForNextCleavage()
                : Promise.resolve()
            )
            .catch(error => Promise.reject(error))
    }

    private onTimeForNextCleavage (): Promise<void> {
        return Promise.resolve([
            this.applicationServices.autoplay.configureNextAutoPlay(),
            this.applicationServices.event.sentEvent(new NewCleavageEvent())
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }
}
