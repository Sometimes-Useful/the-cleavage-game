import type { Cleavage } from '../../../entities/Cleavage'
import type { GamePhase } from '../../../entities/GamePhase'
import type { InterfaceView } from '../../../entities/InterfaceView'
import type { Music } from '../../../entities/music/Music'
import type { ApplicationNotification } from '../../../entities/notification/Notification'
import type { Position } from '../../../entities/Position'
import type { Sound } from '../../../entities/sound'
import type { Sprite } from '../../../events/playerMove/Sprite'
import type { InterfaceEntityState } from '../../../tests/unitTests/interfaceGateway'

export interface InterfaceGateway {
    changeGamePhase(gamePhase: GamePhase):Promise<void>
    removeEntityInterfaceState(id: string): Promise<void>
    updateEntityInterfaceState(id:string, interfaceEntityState: InterfaceEntityState): Promise<void>
    disableAutoplay(): Promise<void>
    enableAutoplay(): Promise<void>
    changeMusicVolumeLevel(volume: number):Promise<void>
    changeSoundVolumeLevel(volume: number): Promise<void>
    playMusic(music: Music): Promise<void>
    playSound(sound: Sound): Promise<void>
    retrieveCurrentView(): Promise<InterfaceView>
    notify(notification: ApplicationNotification): any
    updateCleavage(cleavage: Cleavage|undefined): Promise<void>;
    changeView(interfaceView: InterfaceView): Promise<void>;
}

export const interfaceEntityState = (position:Position, sprite:Sprite): InterfaceEntityState => ({ position, sprite })
