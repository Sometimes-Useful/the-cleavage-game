import { GlobalCleavageDrawPileApplicationService } from '../../../domain/applicationServices/GlobalCleavageDrawPileApplicationService'
import { GlobalStreamersApplicationService } from '../../../domain/applicationServices/GlobalStreamersApplicationService'
import type { ServerApplicationServices } from '../../../domain/ports/ApplicationServices'
import { PrimaryServerCommandController } from '../../../domain/ports/primary/PrimaryServerController'
import { PrimaryServerQueryController } from '../../../domain/ports/primary/PrimaryServerQueryController'
import type { ServerApplicationGateways } from '../../../domain/ports/secondary/gateways/ApplicationGateways'
import type { ServerApplicationRepositories } from '../../../domain/ports/secondary/repositories/ApplicationRepositories'

export class ProductionServerApplication {
    constructor (
        public gateways:ServerApplicationGateways,
        public repositories:ServerApplicationRepositories

    ) {
        const applicationService:ServerApplicationServices = {
            globalCleavageDrawPile: new GlobalCleavageDrawPileApplicationService(this.repositories.globalCleavageDrawPileRepository, this.gateways.random),
            globalStreamers: new GlobalStreamersApplicationService(this.repositories.globalRegisteredStreamers)
        }
        this.queryController = new PrimaryServerQueryController(applicationService)
        this.gateways.event.configureController(new PrimaryServerCommandController(applicationService))
    }

    public queryController:PrimaryServerQueryController
}
