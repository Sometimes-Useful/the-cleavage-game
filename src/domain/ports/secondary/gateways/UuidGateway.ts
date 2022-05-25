export interface UuidGateway {
    nextId(): Promise<string>;
}
