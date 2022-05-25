import type { VideoExtract } from '../../../entities/VideoExtract'

export interface VideoExtractRepository {
    retreiveEqualityVideoExtracts(): Promise<VideoExtract[]>;
    retreiveVideoExtractsByChoice(majorChoice: string):Promise<VideoExtract[]>;
    hasVideoExtract(choice: string): Promise<boolean>;
    hasEqualityVideoExtract(): Promise<boolean>;
}
