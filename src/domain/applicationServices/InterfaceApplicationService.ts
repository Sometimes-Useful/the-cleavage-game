import type { Cleavage } from '../entities/Cleavage'
import type { InterfaceView } from '../entities/InterfaceView'
import type { Music } from '../entities/music/Music'
import type { ApplicationNotification } from '../entities/notification/Notification'
import { noPublicCleavageNotification } from '../entities/notification/notifications'
import type { Sound } from '../entities/sound'
import type { InterfaceGateway } from '../ports/InterfaceGateway'

export class InterfaceApplicationService {
    playMusic (music: Music): Promise<void> {
        return this.interfaceGateway.playMusic(music)
    }

    constructor (private interfaceGateway:InterfaceGateway) {}
    onNoPublicCleavage (): Promise<void> {
        return Promise.all([
            this.clearCleavage(),
            this.notify(noPublicCleavageNotification)
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
