import { InterfaceView } from '../entities/InterfaceView'
import { InterfaceGateway } from '../ports/InterfaceGateway'

export class InterfaceApplicationService {
    constructor (private interfaceGateway:InterfaceGateway) {}
    updateCleavageTitle (cleavageTitle: string):Promise<void> {
        return this.interfaceGateway.updateCleavageTitle(cleavageTitle)
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        return this.interfaceGateway.changeView(interfaceView)
    }
}
