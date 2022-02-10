import type { FakeClientApplicationGateways } from '../../../domain/ports/secondary/gateways/ApplicationGateways'
import type { FakeClientApplicationRepositories } from '../../../domain/ports/secondary/repositories/ApplicationRepositories'

export class FakeClientApplication {
    constructor (
        public gateways:FakeClientApplicationGateways,
        public repositories:FakeClientApplicationRepositories
    ) { }
}
