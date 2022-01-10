import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'
import { cleavageStore, interfaceViewStore } from '../../../ui/stores/stores'
export class SvelteInterfaceGateway implements InterfaceGateway {
    notify (notification: ApplicationNotification): Promise<void> {
        console.log('NOTIFY', notification.message)
        return Promise.resolve()
    }

    updateCleavage (cleavage: Cleavage): Promise<void> {
        console.log('UPDATE_CLEAVAGE', cleavage)
        cleavageStore.set(cleavage)
        return Promise.resolve()
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        console.log('CHANGE_VIEW', interfaceView)
        interfaceViewStore.set(interfaceView)
        return Promise.resolve()
    }
}
