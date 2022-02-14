import type { PrimaryServerQueryController } from '../../../domain/ports/primary/PrimaryServerQueryController'
import type { FakeServerApplicationGateways } from '../../../domain/ports/secondary/gateways/ApplicationGateways'
import type { FakeServerApplicationRepositories } from '../../../domain/ports/secondary/repositories/ApplicationRepositories'

export class FakeServerApplication {
    constructor (
        public gateways:FakeServerApplicationGateways,
        public repositories:FakeServerApplicationRepositories,
        public queryController:PrimaryServerQueryController
    ) { }
}
