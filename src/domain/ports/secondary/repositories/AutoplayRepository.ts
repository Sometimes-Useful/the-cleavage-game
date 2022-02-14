export interface AutoplayRepository {
    configureAutoplayInterval(autoplayMinutes: number): Promise<void>;
    retreiveAutoplayInterval():Promise<number>;
    retrieveNextAutoPlayDate(): Promise<Date>;
    hasAutoplay(): Promise<boolean>;
    configureNextAutoPlay(date: Date|null):Promise<void>
}
