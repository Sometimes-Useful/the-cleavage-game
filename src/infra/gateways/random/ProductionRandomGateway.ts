import type { RandomGateway } from '../../../domain/ports/secondary/gateways/RandomGateway'

export class ProductionRandomGateway implements RandomGateway {
    randomIntegerOnRange (startingNumber: number, endingNumber: number): Promise<number> {
        startingNumber = Math.ceil(startingNumber)
        endingNumber = Math.floor(endingNumber)
        return Promise.resolve(Math.floor(Math.random() * (endingNumber - startingNumber + 1)) + startingNumber)
    }
}
