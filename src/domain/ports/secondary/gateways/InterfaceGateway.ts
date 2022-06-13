import type { Cleavage } from '../../../entities/Cleavage'
import type { GamePhase } from '../../../entities/GamePhase'
import type { InterfaceEntityState } from '../../../entities/InterfaceEntityState'
import type { InterfaceView } from '../../../entities/InterfaceView'
import type { Music } from '../../../entities/music/Music'
import type { ApplicationNotification } from '../../../entities/notification/Notification'
import type { Position } from '../../../entities/Position'
import type { Size } from '../../../entities/Size'
import type { Sound } from '../../../entities/sound'
import type { SpriteType } from '../../../entities/SpriteType'
import type { StreamerDto } from '../../../entities/StreamerDto'
import type { VideoExtract } from '../../../entities/VideoExtract'

export interface InterfaceGateway {
    helpDisabled(): Promise<void>
    helpEnabled(helpMessage:string): Promise<void>
    updateStreamerRegistered(isRegistered:boolean): Promise<void>
    updateListOfRegisteredStreamers(streamers: StreamerDto[]): Promise<void>
    updateCleavageDrawpileQuantity(cleavageDrawpileQuantity: number): Promise<void>
    changeVideoExtractVolumeLevel(volume: number): Promise<void>
    unMuteMusic(): Promise<void>
    muteMusic(): Promise<void>
    changeVideoExtract(videoExtract: VideoExtract|undefined): Promise<void>
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

export const interfaceEntityState = (position:Position, spriteType:SpriteType, size:Size): InterfaceEntityState => ({ position, spriteType, size })
