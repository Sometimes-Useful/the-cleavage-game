export class VideoExtract {
    constructor (
        public readonly choice: string,
        public readonly percentage: number,
        public readonly youtubeVideoId: string,
        public readonly startExtractSeconds?: number,
        public readonly endExtractSeconds?: number
    ) { }
}
