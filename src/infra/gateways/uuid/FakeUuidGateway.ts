import type { UuidGateway } from '../../../domain/ports/secondary/gateways/UuidGateway'

export class FakeUuidGateway implements UuidGateway {
    uuids: string[] = [];
    nextId (): Promise<string> {
        const uuid = this.uuids.shift()
        return uuid
            ? Promise.resolve(uuid)
            : Promise.reject(new Error(`No UUID available on ${this.constructor.name}.`))
    }
}
