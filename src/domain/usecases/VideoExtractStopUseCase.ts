import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import type { VideoExtractApplicationService } from '../applicationServices/VideoExtractApplicationService'
import { GamePhase } from '../entities/GamePhase'
import { ChangeGamePhaseEvent } from '../events/changeGamePhase/ChangeGamePhaseEvent'
import { DrawCleavageEvent } from '../events/drawCleavage/DrawCleavageEvent'
import type { VideoExtractStopEvent } from '../events/videoExtractEnd/VideoExtractStopEvent'
import { UseCase } from './UseCase'

interface VideoExtractStopUseCaseApplicationServices {
    autoplay:AutoplayApplicationService
    event:EventApplicationService
    videoExtract:VideoExtractApplicationService
}

export class VideoExtractStopUseCase extends UseCase {
    constructor (private applicationServices: VideoExtractStopUseCaseApplicationServices) { super() }
    execute (event: VideoExtractStopEvent): Promise<void> {
        return Promise.all([
            this.applicationServices.videoExtract.removeVideoExtractOnInterface()
        ])
            .then(() => this.applicationServices.autoplay.hasAutoplay())
            .then(hasAutoplay => this.applicationServices.event.sentEvents([
                new ChangeGamePhaseEvent(GamePhase.NEW_CLEAVAGE),
                ...hasAutoplay ? [new DrawCleavageEvent()] : []
            ]))
    }
}
