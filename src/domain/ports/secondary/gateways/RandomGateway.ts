export interface RandomGateway {
    randomIntegerOnRange(startingNumber: number, endingNumber:number): Promise<number>;
}
