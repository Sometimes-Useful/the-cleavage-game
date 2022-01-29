import type { FakeApplicationGateways } from '../../domain/ports/secondary/gateways/ApplicationGateways'
import type { FakeApplicationRepositories } from '../../domain/ports/secondary/repositories/ApplicationRepositories'

export class FakeApplication {
    constructor (
        public gateways:FakeApplicationGateways,
        public repositories:FakeApplicationRepositories
    ) { }
}
