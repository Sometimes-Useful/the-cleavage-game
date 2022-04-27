import type { Cleavage } from '../entities/Cleavage'
import type { GamePhase } from '../entities/GamePhase'
import type { InterfaceEntityState } from '../entities/InterfaceEntityState'
import type { InterfaceView } from '../entities/InterfaceView'
import type { Music } from '../entities/music/Music'
import type { ApplicationNotification } from '../entities/notification/Notification'
import { noCleavageAvailableNotification } from '../entities/notification/notifications'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'
import type { InterfaceGateway } from '../ports/secondary/gateways/InterfaceGateway'

export class InterfaceApplicationService {
    changeVideoExtractVolumeLevel (volume: number): Promise<void> {
        return Promise.all([
            this.playSound(new Sound(SupportedSound.TICK)),
            this.interfaceGateway.changeVideoExtractVolumeLevel(volume)
        ])
            .then(() => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    changeGamePhase (gamePhase: GamePhase):Promise<void> {
        return this.interfaceGateway.changeGamePhase(gamePhase)
    }

    removeEntityInterfaceState (id: string): Promise<void> {
        return this.interfaceGateway.removeEntityInterfaceState(id)
    }

    updateEntityInterfaceState (id:string, interfaceEntityState:InterfaceEntityState): Promise<void> {
        return this.interfaceGateway.updateEntityInterfaceState(id, interfaceEntityState)
    }

    disableAutoplay (): Promise<void> {
        return this.interfaceGateway.disableAutoplay()
    }

    enableAutoplay (): Promise<void> {
        return this.interfaceGateway.enableAutoplay()
    }

    constructor (private interfaceGateway:InterfaceGateway) {}
    changeMusicVolumeLevel (volume: number) {
        return this.interfaceGateway.changeMusicVolumeLevel(volume)
    }

    changeSoundVolumeLevel (volume: number): Promise<void> {
        return this.interfaceGateway.changeSoundVolumeLevel(volume)
    }

    playMusic (music: Music): Promise<void> {
        return this.interfaceGateway.playMusic(music)
    }

    onNoCleavageAvailable (): Promise<void> {
        return Promise.all([
            this.clearCleavage(),
            this.notify(noCleavageAvailableNotification)
        ])
            .then(results => Promise.resolve())
            .catch(error => Promise.reject(error))
    }

    playSound (sound: Sound): Promise<void> {
        return this.interfaceGateway.playSound(sound)
    }

    retrieveCurrentView () : Promise<InterfaceView> {
        return this.interfaceGateway.retrieveCurrentView()
    }

    notify (notification: ApplicationNotification): Promise<void> {
        return this.interfaceGateway.notify(notification)
    }

    updateCleavage (cleavage: Cleavage):Promise<void> {
        return this.interfaceGateway.updateCleavage(cleavage)
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        return this.interfaceGateway.changeView(interfaceView)
    }

    newCleavage (): Promise<void> {
        return this.clearCleavage()
    }

    clearCleavage (): Promise<void> {
        return this.interfaceGateway.updateCleavage(undefined)
    }
}
