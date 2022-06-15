import type { VideoExtract } from '../../../entities/VideoExtract'

export interface VideoExtractRepository {
    retreiveAllExtracts(): Promise<VideoExtract[]>;
    retreiveEqualityVideoExtracts(): Promise<VideoExtract[]>;
    retreiveVideoExtractsByChoice(majorChoice: string):Promise<VideoExtract[]>;
    hasVideoExtract(choice: string): Promise<boolean>;
    hasEqualityVideoExtract(): Promise<boolean>;
}
