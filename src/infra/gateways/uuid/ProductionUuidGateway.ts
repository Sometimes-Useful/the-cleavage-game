import type { UuidGateway } from '../../../domain/ports/secondary/gateways/UuidGateway'
import { v4 as uuid } from 'uuid'

export class ProductionUuidGateway implements UuidGateway {
    nextId (): Promise<string> {
        return Promise.resolve(uuid())
    }
}
