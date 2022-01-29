import type { Cleavage } from '../../../domain/entities/Cleavage'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { Sound } from '../../../domain/entities/sound'
import type { Music } from '../../../domain/entities/music/Music'
import type { InterfaceGateway } from '../../../domain/ports/secondary/gateways/InterfaceGateway'

export class FakeInterfaceGateway implements InterfaceGateway {
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

    currentCleavage: Cleavage|undefined
    notifications: ApplicationNotification[] = [];
    playingSounds: Sound[] = []
    musicVolume: number = 0
    soundVolume: number = 0
    playingMusic: Music | undefined = undefined
    currentView: InterfaceView = InterfaceView.NONE;
}
