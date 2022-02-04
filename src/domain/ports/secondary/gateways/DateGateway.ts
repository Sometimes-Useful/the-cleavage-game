export interface DateGateway {
    retrieveCurrentDate(): Promise<Date>;
}
