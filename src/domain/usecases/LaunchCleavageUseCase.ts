import { UseCase } from './UseCase'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { InterfaceView } from '../entities/InterfaceView'
import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { LaunchCleavageEvent } from '../events/launchCleavage/LaunchCleavageEvent'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import { Cleavage } from '../entities/Cleavage'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import { PlayerCleave } from '../entities/PlayerCleave'

export class LaunchCleavageUseCase extends UseCase {
    constructor (
        private interfaceApplicationService: InterfaceApplicationService,
        private chatApplicationService:ChatApplicationService,
        private cleavageApplicationService:CleavageApplicationService,
        private eventApplicationService:EventApplicationService,
        private playerApplicationService:PlayerApplicationService
    ) {
        super()
    }

    execute (event: LaunchCleavageEvent): Promise<void> {
        return this.chatApplicationService.isConnected()
            .then(isConnected => isConnected
                ? this.onConnected(event)
                : this.eventApplicationService.sentEvent(new NavigateEvent(InterfaceView.CONNECT_CHAT))
            )
            .catch(error => Promise.reject(error))
    }

    private onConnected (event:LaunchCleavageEvent): Promise<void> {
        return this.playerApplicationService.players()
            .then(players => {
                const cleaves:Map<string, PlayerCleave> = new Map()
                players.forEach(player => cleaves.set(player.username, PlayerCleave.NOTHING))
                return this.cleavageApplicationService.saveCleavage(new Cleavage(event.cleavageTitle, cleaves))
            })
            .then(() => this.cleavageApplicationService.loadCleavage())
            .then(cleavage => Promise.all([
                this.interfaceApplicationService.updateCleavage(cleavage),
                this.cleavageApplicationService.saveGlobalCleavage(cleavage)
            ]))
            .then(() => this.eventApplicationService.sentEvent(new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE)))
            .catch(error => Promise.reject(error))
    }
}
