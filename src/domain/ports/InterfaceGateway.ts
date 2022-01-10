import type { Cleavage } from '../entities/Cleavage'
import type { InterfaceView } from '../entities/InterfaceView'
import type { ApplicationNotification } from '../entities/notification/Notification'

export interface InterfaceGateway {
    notify(notification: ApplicationNotification): any
    updateCleavage(cleavage: Cleavage): Promise<void>;
    changeView(interfaceView: InterfaceView): Promise<void>;
}
