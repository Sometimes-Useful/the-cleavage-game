import { InterfaceView } from '../../../domain/entities/InterfaceView'
import { InterfaceGateway } from '../../../domain/ports/InterfaceGateway'

export class FakeInterfaceGateway implements InterfaceGateway {
    updateCleavageTitle (cleavageTitle: string): Promise<void> {
        this.currentCleavageTitle = cleavageTitle
        return Promise.resolve()
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        this.currentView = interfaceView
        return Promise.resolve()
    }

    currentCleavageTitle: string = ''
    currentView: InterfaceView = InterfaceView.NONE;
}
