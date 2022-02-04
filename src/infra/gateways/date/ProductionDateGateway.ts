import type { DateGateway } from '../../../domain/ports/secondary/gateways/DateGateway'

export class ProductionDateGateway implements DateGateway {
    retrieveCurrentDate (): Promise<Date> {
        return Promise.resolve(new Date())
    }
}
