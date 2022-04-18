import { AutoplayApplicationService } from '../../../domain/applicationServices/AutoplayApplicationService'
import { BarApplicationService } from '../../../domain/applicationServices/BarApplicationService'
import { ChatApplicationService } from '../../../domain/applicationServices/ChatApplicationService'
import { CleavageApplicationService } from '../../../domain/applicationServices/CleavageService'
import { EventApplicationService } from '../../../domain/applicationServices/EventApplicationService'
import { InterfaceApplicationService } from '../../../domain/applicationServices/InterfaceApplicationService'
import { PlayerApplicationService } from '../../../domain/applicationServices/PlayerApplicationService'
import type { Size } from '../../../domain/entities/Size'
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
                    cleavage: new CleavageApplicationService(this.repositories.publicCleavageDrawPile, this.gateways.globalCleavageDrawPile, this.repositories.currentCleavage, this.gateways.chat, this.repositories.gamePhase),
                    interface: new InterfaceApplicationService(this.gateways.interface),
                    player: new PlayerApplicationService(this.repositories.player, this.gateways.event),
                    autoplay: new AutoplayApplicationService(this.repositories.autoplay, this.gateways.date),
                    bar: new BarApplicationService(this.repositories.bar, this.gateways.event, this.gateways.uuid)
                }
                this.gateways.event.configureController(new PrimaryClientController(applicationServices))
                applicationEventStore.subscribe(event => { if (event) this.gateways.event.sendEvent(event) })
                applicationEventStore.set(new ApplicationStartEvent())
                console.log('Application started.')
                const checkAutoPlayIntervalSeconds = (seconds:number) => seconds * 1000
                setInterval(() => this.gateways.event.sendEvent(new CheckAutoplayEvent()), checkAutoPlayIntervalSeconds(5))
                return Promise.resolve()
            })
            .catch(error => console.error(error))
    }

    public addingViewToDom (htmlElement: HTMLElement): Promise<void> {
        return this.gateways.interface.addingViewToDom(htmlElement)
    }

    public changeResolution (resolution:Size): Promise<void> {
        return this.gateways.interface.changeResolution(resolution)
    }
}
