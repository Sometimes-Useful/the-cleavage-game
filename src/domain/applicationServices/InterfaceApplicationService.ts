import type { Cleavage } from '../entities/Cleavage'
import type { InterfaceView } from '../entities/InterfaceView'
import type { ApplicationNotification } from '../entities/notification/Notification'
import type { InterfaceGateway } from '../ports/InterfaceGateway'

export class InterfaceApplicationService {
    constructor (private interfaceGateway:InterfaceGateway) {}

    notify (notification: ApplicationNotification): any {
        return this.interfaceGateway.notify(notification)
    }

    updateCleavage (cleavage: Cleavage):Promise<void> {
        return this.interfaceGateway.updateCleavage(cleavage)
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        return this.interfaceGateway.changeView(interfaceView)
    }
}
