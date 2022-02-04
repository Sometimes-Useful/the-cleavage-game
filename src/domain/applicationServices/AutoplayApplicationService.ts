import type { DateGateway } from '../ports/secondary/gateways/DateGateway'
import type { AutoplayRepository } from '../ports/secondary/repositories/AutoplayRepository'

export class AutoplayApplicationService {
    constructor (
        private autoplayRepository:AutoplayRepository,
        private dateGateway: DateGateway
    ) {}

    public hasAutoplay ():Promise<boolean> {
        return this.autoplayRepository.hasAutoplay()
    }

    public isTimeForNextCleavage (): Promise<boolean> {
        return Promise.all([
            this.autoplayRepository.retrieveNextAutoPlayDate(),
            this.dateGateway.retrieveCurrentDate()
        ])
            .then(([nextAutoplayDate, currentDate]) => Promise.resolve(currentDate >= nextAutoplayDate))
            .catch(error => Promise.reject(error))
    }

    public configureNextAutoPlay (autoplayMinutes?: number): Promise<void> {
        return autoplayMinutes === 0
            ? this.onDisableAutoplay(autoplayMinutes)
            : this.dateGateway.retrieveCurrentDate()
                .then(currentDate => autoplayMinutes
                    ? this.onAutoplayMinutes(currentDate, autoplayMinutes)
                    : this.onNoAutoplayMinutes(currentDate)
                )
                .catch(error => Promise.reject(error))
    }

    private onDisableAutoplay (autoplayMinutes: number): Promise<void> {
        return Promise.all([
            this.autoplayRepository.configureAutoplayInterval(autoplayMinutes),
            this.autoplayRepository.configureNextAutoPlay(null)
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    private onAutoplayMinutes (currentDate: Date, autoplayMinutes: number): Promise<void> {
        return Promise.all([
            this.autoplayRepository.configureNextAutoPlay(this.addMinutes(new Date(currentDate), autoplayMinutes)),
            this.autoplayRepository.configureAutoplayInterval(autoplayMinutes)
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    onNoAutoplayMinutes (currentDate: Date): any {
        return this.autoplayRepository.retreiveAutoplayInterval()
            .then(autoplayInterval => this.autoplayRepository.configureNextAutoPlay(this.addMinutes(new Date(currentDate), autoplayInterval)))
            .catch(error => Promise.reject(error))
    }

    private addMinutes (date: Date, minutes:number): Date {
        date.setMinutes(date.getMinutes() + minutes)
        return date
    }
}
