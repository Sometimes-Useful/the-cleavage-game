import { AutoplayApplicationService } from '../../../domain/applicationServices/AutoplayApplicationService'
import { BarApplicationService } from '../../../domain/applicationServices/BarApplicationService'
import { ChatApplicationService } from '../../../domain/applicationServices/ChatApplicationService'
import { CleavageApplicationService } from '../../../domain/applicationServices/CleavageService'
import { EventApplicationService } from '../../../domain/applicationServices/EventApplicationService'
import { InterfaceApplicationService } from '../../../domain/applicationServices/InterfaceApplicationService'
import { PlayerApplicationService } from '../../../domain/applicationServices/PlayerApplicationService'
import { StreamersApplicationService } from '../../../domain/applicationServices/StreamerApplicationService'
import { VideoExtractApplicationService } from '../../../domain/applicationServices/VideoExtractApplicationService'
import type { Size } from '../../../domain/entities/Size'
import { ApplicationStartEvent } from '../../../domain/events/applicationStart/ApplicationStartEvent'
import { CheckAutoplayEvent } from '../../../domain/events/checkAutoplay/CheckAutoplayEvent'
import type { ClientApplicationServices } from '../../../domain/ports/ApplicationServices'
import { PrimaryClientController } from '../../../domain/ports/primary/PrimaryClientController'
import type { ProductionClientApplicationGateways } from '../../../domain/ports/secondary/gateways/ApplicationGateways'
import type { ProductionClientApplicationRepositories } from '../../../domain/ports/secondary/repositories/ApplicationRepositories'
import { intervalInSeconds } from '../../../generic/interval'
import { applicationEventStore } from '../../../ui/stores/stores'

export class ProductionClientApplication {
    constructor (
        public gateways: ProductionClientApplicationGateways,
        public repositories: ProductionClientApplicationRepositories
    ) { }

    public start ():Promise<void> {
        console.log('Application starting...')
        return this.applicationStarted
            ? Promise.resolve()
            : this.gateways.interface.load()
                .then(() => {
                    this.configureController()
                    this.configureApplicationEventStore()
                    setInterval(() => this.gateways.event.sendEvent(new CheckAutoplayEvent()), intervalInSeconds(5))
                    console.log('Application started.')
                    return Promise.resolve()
                })
                .then(() => {
                    this.applicationStarted = true
                    return Promise.resolve()
                })
                .catch(error => {
                    this.applicationStarted = false
                    return Promise.reject(error)
                })
    }

    private configureApplicationEventStore () {
        applicationEventStore.subscribe(event => { (event && this.gateways.event.sendEvent(event)) })
        applicationEventStore.set(new ApplicationStartEvent())
    }

    private configureController () {
        const applicationServices: ClientApplicationServices = {
            streamers: new StreamersApplicationService(this.gateways.streamers),
            videoExtract: new VideoExtractApplicationService(this.repositories.videoExtracts, this.gateways.interface, this.gateways.random),
            chat: new ChatApplicationService(this.gateways.chat, this.gateways.interface),
            event: new EventApplicationService(this.gateways.event),
            cleavage: new CleavageApplicationService(this.repositories.publicCleavageDrawPile, this.gateways.globalCleavageDrawPile, this.repositories.currentCleavage, this.gateways.chat, this.repositories.gamePhase),
            interface: new InterfaceApplicationService(this.gateways.interface),
            player: new PlayerApplicationService(this.repositories.player, this.gateways.event),
            autoplay: new AutoplayApplicationService(this.repositories.autoplay, this.gateways.date),
            bar: new BarApplicationService(this.repositories.bar, this.gateways.event, this.gateways.uuid)
        }
        this.gateways.event.configureController(new PrimaryClientController(applicationServices))
    }

    public addingViewToDom (htmlElement: HTMLElement): Promise<void> {
        return this.gateways.interface.addingViewToDom(htmlElement)
    }

    public changeResolution (resolution:Size): Promise<void> {
        return this.gateways.interface.changeResolution(resolution)
    }

    private applicationStarted: boolean = false
}
