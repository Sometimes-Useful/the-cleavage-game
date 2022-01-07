import { UseCase } from './UseCase'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent'

export class PlayerCleaveUseCase extends UseCase {
    constructor (private cleavageApplicationService: CleavageApplicationService) { super() }
    execute (event: PlayerCleaveEvent): Promise<void> {
        return this.cleavageApplicationService.playerCleave(event)
    }
}
