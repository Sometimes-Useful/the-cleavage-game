import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import type { VideoExtractApplicationService } from '../applicationServices/VideoExtractApplicationService'
import type { Cleavage } from '../entities/Cleavage'
import { GamePhase } from '../entities/GamePhase'
import { ChangeGamePhaseEvent } from '../events/changeGamePhase/ChangeGamePhaseEvent'
import { DrawCleavageEvent } from '../events/drawCleavage/DrawCleavageEvent'
import type { VideoExtractStartEvent } from '../events/videoExtractStart/VideoExtractStartEvent'
import { UseCase } from './UseCase'

interface VideoExtractStartUseCaseApplicationServices {
    videoExtract: VideoExtractApplicationService,
    event:EventApplicationService,
    autoplay:AutoplayApplicationService,
    cleavage:CleavageApplicationService
}

export class VideoExtractStartUseCase extends UseCase {
    constructor (private applicationServices:VideoExtractStartUseCaseApplicationServices) { super() }
    execute (event: VideoExtractStartEvent): Promise<void> {
        return this.applicationServices.cleavage.hasCurrentCleavage()
            .then(hasCleavage => hasCleavage ? this.onCleavage() : this.withoutCleavage())
    }

    private onCleavage (): Promise<void> {
        return this.applicationServices.cleavage.loadCurrentCleavage()
            .then(cleavage => Promise.all([
                this.applicationServices.autoplay.hasAutoplay(),
                this.applicationServices.videoExtract.hasVideoExtractForChoice(cleavage.majorChoice()),
                cleavage
            ]))
            .then(([isAutoplay, hasVideoExtract, cleavage]) => hasVideoExtract
                ? this.onVideoExtract(cleavage, isAutoplay, hasVideoExtract)
                : this.sendNextEvents(isAutoplay, hasVideoExtract)
            )
            .catch(error => Promise.reject(error))
    }

    private onVideoExtract (cleavage: Cleavage, isAutoplay: boolean, hasVideoExtract:boolean): Promise<void> {
        return this.applicationServices.videoExtract.applyVideoExtractOnInterface(cleavage)
            .then(() => this.sendNextEvents(isAutoplay, hasVideoExtract))
            .catch(error => Promise.reject(error))
    }

    private withoutCleavage (): Promise<void> {
        return this.applicationServices.autoplay.hasAutoplay()
            .then(isAutoplay => this.sendNextEvents(isAutoplay, false))
            .catch(error => Promise.reject(error))
    }

    private sendNextEvents (isAutoplay: boolean, hasVideoExtract:boolean): Promise<void> {
        return this.applicationServices.event.sentEvents([
            new ChangeGamePhaseEvent(hasVideoExtract ? GamePhase.PLAY_VIDEO : GamePhase.NEW_CLEAVAGE),
            ...isAutoplay && !hasVideoExtract ? [new DrawCleavageEvent()] : []
        ])
            .catch(error => Promise.reject(error))
    }
}
