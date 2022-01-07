import type { Cleavage } from '../../../domain/entities/Cleavage'
import type { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'
import { cleavageStore, interfaceViewStore } from '../../../ui/stores/stores'
export class SvelteInterfaceGateway implements InterfaceGateway {
    updateCleavage (cleavage: Cleavage): Promise<void> {
        console.log('update cleavage with', cleavage)
        cleavageStore.set(cleavage)
        return Promise.resolve()
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        interfaceViewStore.set(interfaceView)
        return Promise.resolve()
    }
}
