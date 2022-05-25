import type { Player } from '../../../entities/Player'

export interface PlayerRepository {
    playerByUsername(username: string):Promise<Player>;
    hasPlayer(username:string): Promise<boolean>;
    loadAllPlayers():Promise<Player[]>;
    remove(player: Player): Promise<void>;
    save(player: Player): Promise<void>;
}
