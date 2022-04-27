import type { Cleavage } from '../../../domain/entities/Cleavage'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { Sound } from '../../../domain/entities/sound'
import type { Music } from '../../../domain/entities/music/Music'
import type { InterfaceGateway } from '../../../domain/ports/secondary/gateways/InterfaceGateway'
import { GamePhase } from '../../../domain/entities/GamePhase'
import type { InterfaceEntityState } from '../../../domain/entities/InterfaceEntityState'
import type { VideoExtract } from '../../../domain/entities/VideoExtract'

export class FakeInterfaceGateway implements InterfaceGateway {
    changeVideoExtractVolumeLevel (volume: number): Promise<void> {
        this.videoExtractVolume = volume
        return Promise.resolve()
    }

    unMuteMusic (): Promise<void> {
        this.musicMuted = false
        return Promise.resolve()
    }

    muteMusic ():Promise<void> {
        this.musicMuted = true
        return Promise.resolve()
    }

    changeVideoExtract (videoExtract: VideoExtract): Promise<void> {
        this.videoExtract = videoExtract
        return Promise.resolve()
    }

    changeGamePhase (gamePhase: GamePhase): Promise<void> {
        this.gamePhase = gamePhase
        return Promise.resolve()
    }

    removeEntityInterfaceState (id: string): Promise<void> {
        this.interfaceEntitiesState.delete(id)
        return Promise.resolve()
    }

    updateEntityInterfaceState (id:string, interfaceEntityState: InterfaceEntityState): Promise<void> {
        this.interfaceEntitiesState.set(id, interfaceEntityState)
        return Promise.resolve()
    }

    disableAutoplay (): Promise<void> {
        this.autoplayEnabled = false
        return Promise.resolve()
    }

    enableAutoplay (): Promise<void> {
        this.autoplayEnabled = true
        return Promise.resolve()
    }

    changeMusicVolumeLevel (volume: number): Promise<void> {
        this.musicVolume = volume
        return Promise.resolve()
    }

    changeSoundVolumeLevel (volume: number): Promise<void> {
        this.soundVolume = volume
        return Promise.resolve()
    }

    playMusic (music: Music): Promise<void> {
        this.playingMusic = music
        return Promise.resolve()
    }

    playSound (sound: Sound): Promise<void> {
        this.playingSounds.push(sound)
        return Promise.resolve()
    }

    retrieveCurrentView (): Promise<InterfaceView> {
        return Promise.resolve(this.currentView)
    }

    notify (notification:ApplicationNotification): Promise<void> {
        this.notifications.push(notification)
        return Promise.resolve()
    }

    updateCleavage (cleavage: Cleavage|undefined): Promise<void> {
        this.currentCleavage = cleavage
        return Promise.resolve()
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        this.currentView = interfaceView
        return Promise.resolve()
    }

    musicMuted: boolean = false
    gamePhase: GamePhase = GamePhase.NONE
    currentCleavage: Cleavage|undefined
    notifications: ApplicationNotification[] = [];
    playingSounds: Sound[] = []
    musicVolume: number = 0
    soundVolume: number = 0
    videoExtractVolume: number = 0
    autoplayEnabled: boolean = false
    playingMusic: Music | undefined = undefined
    currentView: InterfaceView = InterfaceView.NONE;
    interfaceEntitiesState: Map<string, InterfaceEntityState> = new Map()
    videoExtract: VideoExtract|undefined
}
