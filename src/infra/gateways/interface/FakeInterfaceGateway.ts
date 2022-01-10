import type { Cleavage } from '../../../domain/entities/Cleavage'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'

export class FakeInterfaceGateway implements InterfaceGateway {
    notify (notification:ApplicationNotification): Promise<void> {
        this.notifications.push(notification)
        return Promise.resolve()
    }

    updateCleavage (cleavage: Cleavage): Promise<void> {
        this.currentCleavage = cleavage
        return Promise.resolve()
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        this.currentView = interfaceView
        return Promise.resolve()
    }

    currentCleavage: Cleavage|undefined
    notifications: ApplicationNotification[] = [];
    currentView: InterfaceView = InterfaceView.NONE;
}
