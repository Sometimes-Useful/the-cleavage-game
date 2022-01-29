import type { Player } from '../../../entities/Player'

export interface PlayerRepository {
    hasPlayer(player:Player): Promise<boolean>;
    players():Promise<Player[]>;
    remove(player: Player): Promise<void>;
    add(player: Player): Promise<void>;
}
