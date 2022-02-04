import type { DateGateway } from '../../../domain/ports/secondary/gateways/DateGateway'

export class FakeDateGateway implements DateGateway {
    retrieveCurrentDate (): Promise<Date> {
        return Promise.resolve(this.currentDate)
    }

    currentDate: Date = new Date()
}
