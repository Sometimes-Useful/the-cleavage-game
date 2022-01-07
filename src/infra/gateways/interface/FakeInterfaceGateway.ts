import type { Cleavage } from '../../../domain/entities/Cleavage'
import { InterfaceView } from '../../../domain/entities/InterfaceView'
import type { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'

export class FakeInterfaceGateway implements InterfaceGateway {
    updateCleavage (cleavage: Cleavage): Promise<void> {
        this.currentCleavageTitle = cleavage.title
        return Promise.resolve()
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        this.currentView = interfaceView
        return Promise.resolve()
    }

    currentCleavageTitle: string = ''
    currentView: InterfaceView = InterfaceView.NONE;
}
