
import type { Cleavage } from '../entities/Cleavage'
import type { VideoExtract } from '../entities/VideoExtract'
import type { InterfaceGateway } from '../ports/secondary/gateways/InterfaceGateway'
import type { RandomGateway } from '../ports/secondary/gateways/RandomGateway'
import type { VideoExtractRepository } from '../ports/secondary/repositories/VideoExtractRepository'

export class VideoExtractApplicationService {
    constructor (
        private videoExtractRepository:VideoExtractRepository,
        private interfaceGateway:InterfaceGateway,
        private randomGateway: RandomGateway
    ) {}

    removeVideoExtractOnInterface (): Promise<void> {
        return Promise.all([
            this.interfaceGateway.changeVideoExtract(undefined),
            this.interfaceGateway.unMuteMusic()
        ])
            .then(() => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    applyVideoExtractOnInterface (cleavage:Cleavage, fullRandom:boolean):Promise<void> {
        if (fullRandom) return this.onFullRandom()
        const majorChoice = cleavage.majorChoice()
        return majorChoice
            ? this.onMajorChoice(majorChoice, cleavage)
            : this.onNoMajorChoice()
    }

    private onFullRandom (): Promise<void> {
        return this.videoExtractRepository.retreiveAllExtracts()
            .then(extracts => Promise.all([
                extracts,
                this.randomGateway.randomIntegerOnRange(1, extracts.length)
            ]))
            .then(([extracts, randomChoice]) => {
                const index = randomChoice - 1
                const extract = extracts.at(index)
                return extract
                    ? this.playVideo(extract)
                    : Promise.reject(new Error(noVideoAtIndex(index)))
            })
    }

    private onMajorChoice (majorChoice: string, cleavage:Cleavage): Promise<void> {
        return this.videoExtractRepository.retreiveVideoExtractsByChoice(majorChoice)
            .then(videoExtracts => this.playVideo(this.videoExtractWithClosestMajorChoiceScore(videoExtracts, cleavage)))
            .catch(error => Promise.reject(error))
    }

    private videoExtractWithClosestMajorChoiceScore (videoExtracts: VideoExtract[], cleavage: Cleavage):VideoExtract {
        return videoExtracts.reduce((a, b) => Math.abs(b.percentage - cleavage.majorScore()) < Math.abs(a.percentage - cleavage.majorScore()) ? b : a)
    }

    private playVideo (videoExtract: VideoExtract):Promise<void> {
        return Promise.all([
            this.interfaceGateway.changeVideoExtract(videoExtract),
            this.interfaceGateway.muteMusic()
        ])
            .then(() => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onNoMajorChoice (): Promise<void> {
        return this.videoExtractRepository.retreiveEqualityVideoExtracts()
            .then(videoExtracts => Promise.all([
                videoExtracts,
                this.randomGateway.randomIntegerOnRange(1, videoExtracts.length)
            ]))
            .then(([videoExtracts, randomVideoNumber]) => {
                const index = randomVideoNumber - 1
                const videoExtract = videoExtracts.at(index)
                return videoExtract
                    ? this.playVideo(videoExtract)
                    : Promise.reject(new Error(noVideoAtIndex(index)))
            })
            .catch(error => Promise.reject(error))
    }

    hasVideoExtractForChoice (choice?: string): Promise<boolean> {
        return choice
            ? this.videoExtractRepository.hasVideoExtract(choice)
            : this.videoExtractRepository.hasEqualityVideoExtract()
    }
}
const noVideoAtIndex = (index: number): string => `There is no video extract at index ${index}.`
