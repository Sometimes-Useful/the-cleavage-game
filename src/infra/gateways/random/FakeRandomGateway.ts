import type { RandomGateway } from '../../../domain/ports/secondary/gateways/RandomGateway'

export class FakeRandomGateway implements RandomGateway {
    randomIntegerOnRange (startingNumber: number, endingNumber: number): Promise<number> {
        return Promise.resolve(this.predictiveNumber)
    }

    public predictiveNumber: number = 1;
}
