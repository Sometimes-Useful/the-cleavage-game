import type { VideoExtract } from '../../../domain/entities/VideoExtract'
import type { VideoExtractRepository } from '../../../domain/ports/secondary/repositories/VideoExtractRepository'

export class InMemoryVideoExtractRepository implements VideoExtractRepository {
    retreiveAllExtracts (): Promise<VideoExtract[]> {
        return Promise.resolve(this.videoExtracts)
    }

    retreiveEqualityVideoExtracts (): Promise<VideoExtract[]> {
        return Promise.resolve(this.videoExtracts.filter(videoExtract => videoExtract.choice === this.equalityVideoChoice))
    }

    retreiveVideoExtractsByChoice (majorChoice: string): Promise<VideoExtract[]> {
        return Promise.resolve(this.videoExtracts.filter(videoExtract => videoExtract.choice === majorChoice))
    }

    hasVideoExtract (choice: string): Promise<boolean> {
        return Promise.resolve(this.videoExtracts.some(videoExtract => videoExtract.choice === choice))
    }

    hasEqualityVideoExtract (): Promise<boolean> {
        return Promise.resolve(this.videoExtracts.some(videoExtract => videoExtract.choice === this.equalityVideoChoice))
    }

    public videoExtracts: VideoExtract[] = []
    private equalityVideoChoice = 'equality'
}
