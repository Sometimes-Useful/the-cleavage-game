import type { BarApplicationService } from '../applicationServices/BarApplicationService'
import type { PlayerJoinBarEvent } from '../events/playerJoinBar/PlayerJoinBarEvent'
import { UseCase } from './UseCase'

interface PlayerJoinBarUseCaseApplicationServices {
    bar: BarApplicationService

}

export class PlayerJoinBarUseCase extends UseCase {
    constructor (private applicationServices:PlayerJoinBarUseCaseApplicationServices) { super() }
    execute (event: PlayerJoinBarEvent): Promise<void> {
        return this.applicationServices.bar.hasAvailableTableStool()
            .then(hasAvailableTableStool => hasAvailableTableStool ? this.onTableStoolAvailable(event.username) : this.onTableStoolUnavailable(event.username))
            .catch(error => Promise.reject(error))
    }

    onTableStoolAvailable (username:string):Promise<void> {
        return this.applicationServices.bar.installPlayerOnTableStool(username)
    }

    onTableStoolUnavailable (username:string) {
        return this.applicationServices.bar.hasAvailableBarStool()
            .then(hasAvailableBarStool => hasAvailableBarStool ? this.onBarStoolAvailable(username) : this.onBarStoolUnavailable(username))
            .catch(error => Promise.reject(error))
    }

    onBarStoolUnavailable (username:string): Promise<void> {
        return this.applicationServices.bar.playerQuit(username)
    }

    onBarStoolAvailable (username: string): Promise<void> {
        return this.applicationServices.bar.installPlayerOnBarStool(username)
    }
}
