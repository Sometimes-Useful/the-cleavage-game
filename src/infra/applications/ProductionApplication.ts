import { application } from '../../app'
import { ChatApplicationService } from '../../domain/applicationServices/ChatApplicationService'
import { CleavageApplicationService } from '../../domain/applicationServices/CleavageService'
import { EventApplicationService } from '../../domain/applicationServices/EventApplicationService'
import { InterfaceApplicationService } from '../../domain/applicationServices/InterfaceApplicationService'
import { PlayerApplicationService } from '../../domain/applicationServices/PlayerApplicationService'
import { ApplicationStartEvent } from '../../domain/events/applicationStart/ApplicationStartEvent'
import type { ProductionApplicationGateways } from '../../domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionApplicationRepositories } from '../../domain/ports/secondary/repositories/ApplicationRepositories'
import { applicationEventStore } from '../../ui/stores/stores'

export class ProductionApplication {
    constructor (
        public gateways: ProductionApplicationGateways,
        public repositories: ProductionApplicationRepositories
    ) { }

    public start ():Promise<void> {
        console.log('Application starting...')
        return this.gateways.interface.load()
            .then(() => {
                this.gateways.event.configureController({
                    chat: new ChatApplicationService(this.gateways.chat, this.gateways.interface),
                    event: new EventApplicationService(this.gateways.event),
                    cleavage: new CleavageApplicationService(this.repositories.publicCleavageDrawPile, this.repositories.globalCleavageDrawPile, this.repositories.currentCleavage, this.gateways.chat, this.gateways.random),
                    interface: new InterfaceApplicationService(this.gateways.interface),
                    player: new PlayerApplicationService(this.repositories.player)
                })
                applicationEventStore.subscribe(event => { if (event) application.gateways.event.sendEvent(event) })
                applicationEventStore.set(new ApplicationStartEvent())
                console.log('Application started.')
                return Promise.resolve()
            })
            .catch(error => console.error(error))
    }
}
