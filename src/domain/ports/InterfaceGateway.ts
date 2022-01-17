import type { Cleavage } from '../entities/Cleavage'
import type { InterfaceView } from '../entities/InterfaceView'
import type { Music } from '../entities/music/Music'
import type { ApplicationNotification } from '../entities/notification/Notification'
import type { Sound } from '../entities/sound'

export interface InterfaceGateway {
    playMusic(music: Music): Promise<void>
    playSound(sound: Sound): Promise<void>
    retrieveCurrentView(): Promise<InterfaceView>
    notify(notification: ApplicationNotification): any
    updateCleavage(cleavage: Cleavage|undefined): Promise<void>;
    changeView(interfaceView: InterfaceView): Promise<void>;
}
