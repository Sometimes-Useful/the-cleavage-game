import { AutoplayApplicationService } from '../../../domain/applicationServices/AutoplayApplicationService'
import { ChatApplicationService } from '../../../domain/applicationServices/ChatApplicationService'
import { CleavageApplicationService } from '../../../domain/applicationServices/CleavageService'
import { EventApplicationService } from '../../../domain/applicationServices/EventApplicationService'
import { InterfaceApplicationService } from '../../../domain/applicationServices/InterfaceApplicationService'
import { PlayerApplicationService } from '../../../domain/applicationServices/PlayerApplicationService'
import { ApplicationStartEvent } from '../../../domain/events/applicationStart/ApplicationStartEvent'
import { CheckAutoplayEvent } from '../../../domain/events/checkAutoplay/CheckAutoplayEvent'
import { PrimaryClientController } from '../../../domain/ports/primary/PrimaryClientController'
import type { ProductionClientApplicationGateways } from '../../../domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionClientApplicationRepositories } from '../../../domain/ports/secondary/repositories/ApplicationRepositories'
import { applicationEventStore } from '../../../ui/stores/stores'

export class ProductionClientApplication {
    constructor (
        public gateways: ProductionClientApplicationGateways,
        public repositories: ProductionClientApplicationRepositories
    ) { }

    public start ():Promise<void> {
        console.log('Application starting...')
        return this.gateways.interface.load()
            .then(() => {
                const applicationServices = {
                    chat: new ChatApplicationService(this.gateways.chat, this.gateways.interface),
                    event: new EventApplicationService(this.gateways.event),
                    cleavage: new CleavageApplicationService(this.repositories.publicCleavageDrawPile, this.gateways.globalCleavageDrawPile, this.repositories.currentCleavage, this.gateways.chat),
                    interface: new InterfaceApplicationService(this.gateways.interface),
                    player: new PlayerApplicationService(this.repositories.player),
                    autoplay: new AutoplayApplicationService(this.repositories.autoplay, this.gateways.date)
                }
                this.gateways.event.configureController(new PrimaryClientController(applicationServices))
                applicationEventStore.subscribe(event => { if (event) this.gateways.event.sendEvent(event) })
                applicationEventStore.set(new ApplicationStartEvent())
                console.log('Application started.')
                const checkAutoPlayIntervalSeconds = (seconds:number) => seconds * 1000
                setInterval(() => this.gateways.event.sendEvent(new CheckAutoplayEvent()), checkAutoPlayIntervalSeconds(1))
                return Promise.resolve()
            })
            .catch(error => console.error(error))
    }
}