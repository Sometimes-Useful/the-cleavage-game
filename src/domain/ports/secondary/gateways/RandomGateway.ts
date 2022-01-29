export interface RandomGateway {
    randomIntergerOnRange(startingNumber: number, endingNumber:number): Promise<number>;
}
