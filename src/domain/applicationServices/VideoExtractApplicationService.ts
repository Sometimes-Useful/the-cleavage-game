
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

    applyVideoExtractOnInterface (cleavage:Cleavage):Promise<void> {
        const majorChoice = cleavage.majorChoice()
        return majorChoice
            ? this.onMajorChoice(majorChoice, cleavage)
            : this.onNoMajorChoice()
    }

    private onMajorChoice (majorChoice: string, cleavage:Cleavage): Promise<void> {
        return this.videoExtractRepository.retreiveVideoExtractsByChoice(majorChoice)
            .then(videoExtracts => {
                const videoExtract = videoExtracts.reduce((a, b) => Math.abs(b.percentage - cleavage.majorScore()) < Math.abs(a.percentage - cleavage.majorScore()) ? b : a)
                console.log(JSON.stringify(cleavage))
                console.log(JSON.stringify(videoExtract))
                return this.playVideo(videoExtract)
            })
    }

    private playVideo (videoExtract: VideoExtract): void | PromiseLike<void> {
        Promise.all([
            this.interfaceGateway.changeVideoExtract(videoExtract),
            this.interfaceGateway.muteMusic()
        ])
            .then(() => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onNoMajorChoice (): Promise<void> {
        return this.videoExtractRepository.retreiveEqualityVideoExtracts()
            .then(videoExtracts => Promise.all([videoExtracts, this.randomGateway.randomIntegerOnRange(1, videoExtracts.length)]))
            .then(([videoExtracts, random]) => this.playVideo(videoExtracts[random - 1]))
            .catch(error => Promise.reject(error))
    }

    hasVideoExtractForChoice (choice?: string): Promise<boolean> {
        return choice
            ? this.videoExtractRepository.hasVideoExtract(choice)
            : this.videoExtractRepository.hasEqualityVideoExtract()
    }
}
