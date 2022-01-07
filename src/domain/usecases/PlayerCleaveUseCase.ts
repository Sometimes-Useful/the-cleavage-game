import { UseCase } from "./UseCase";
import { CleavageApplicationService } from '../applicationServices/CleavageService';
import { PlayerCleaveEvent } from '../events/playerCleave/PlayerCleaveEvent';

export class PlayerCleaveUseCase extends UseCase {
    constructor(private cleavageApplicationService: CleavageApplicationService) { super(); }
    execute(event: PlayerCleaveEvent): Promise<void> {
        return this.cleavageApplicationService.playerCleave(event);
    }
}
