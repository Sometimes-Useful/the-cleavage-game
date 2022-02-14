import { GlobalCleavageDrawPileApplicationService } from '../../../domain/applicationServices/GlobalCleavageDrawPileApplicationService'
import { PrimaryServerCommandController } from '../../../domain/ports/primary/PrimaryServerController'
import { PrimaryServerQueryController } from '../../../domain/ports/primary/PrimaryServerQueryController'
import type { ProductionServerApplicationGateways } from '../../../domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionServerApplicationRepositories } from '../../../domain/ports/secondary/repositories/ApplicationRepositories'

export class ProductionServerApplication {
    constructor (
        public gateways:ProductionServerApplicationGateways,
        public repositories:ProductionServerApplicationRepositories

    ) {
        const applicationService = {
            globalCleavageDrawPile: new GlobalCleavageDrawPileApplicationService(this.repositories.globalCleavageDrawPileRepository, this.gateways.random)
        }
        this.queryController = new PrimaryServerQueryController(applicationService)
        this.gateways.event.configureController(new PrimaryServerCommandController(applicationService))
    }

    public queryController:PrimaryServerQueryController
}
