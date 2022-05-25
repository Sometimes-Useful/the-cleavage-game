import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import type { PlayerMoveEvent } from '../events/playerMove/PlayerMoveEvent'
import { defaultPlayerSize } from '../tests/testContexts'
import { UseCase } from './UseCase'

interface PlayerMoveUseCaseApplicationServices {
    player: PlayerApplicationService
}

export class PlayerMoveUseCase extends UseCase {
    constructor (private applicationServices: PlayerMoveUseCaseApplicationServices) { super() }
    execute (event: PlayerMoveEvent): Promise<void> {
        return this.applicationServices.player.updatePosition(event.username, event.position, defaultPlayerSize)
    }
}
