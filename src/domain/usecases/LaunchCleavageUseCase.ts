import { UseCase } from './UseCase'
import { InterfaceView } from '../entities/InterfaceView'
import type { LaunchCleavageEvent } from '../events/launchCleavage/LaunchCleavageEvent'
import { Cleavage } from '../entities/Cleavage'
import { NavigateEvent } from '../events/navigateEvent/NavigateEvent'
import type { ClientApplicationServices } from '../ports/ApplicationServices'

export class LaunchCleavageUseCase extends UseCase {
    constructor (
        private applicationServices:ClientApplicationServices
    ) { super() }

    execute (event: LaunchCleavageEvent): Promise<void> {
        return this.applicationServices.chat.isConnected()
            .then(isConnected => isConnected
                ? this.onConnected(event)
                : this.applicationServices.event.sentEvent(new NavigateEvent(InterfaceView.CONNECT_CHAT))
            )
            .catch(error => Promise.reject(error))
    }

    private onConnected (event:LaunchCleavageEvent): Promise<void> {
        return this.applicationServices.player.players()
            .then(players => this.applicationServices.cleavage.saveCleavage(new Cleavage(event.cleavageTitle, { name: event.leftChoiceName, players: [] }, { name: event.rightChoiceName, players: [] }, players)))
            .then(() => this.applicationServices.cleavage.loadCleavage())
            .then(cleavage => Promise.all([
                this.applicationServices.interface.updateCleavage(cleavage),
                this.applicationServices.cleavage.saveGlobalCleavage(cleavage)
            ]))
            .then(results => this.applicationServices.event.sentEvent(new NavigateEvent(InterfaceView.CURRENT_CLEAVAGE)))
            .catch(error => Promise.reject(error))
    }
}
