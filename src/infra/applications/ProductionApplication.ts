import type { ProductionApplicationGateways } from '../../domain/ports/ApplicationGateways'
import type { ProductionApplicationRepositories } from '../../domain/ports/ApplicationRepositories'

export class ProductionApplication {
    constructor (
        public gateways: ProductionApplicationGateways,
        public repositories: ProductionApplicationRepositories
    ) { }
}
