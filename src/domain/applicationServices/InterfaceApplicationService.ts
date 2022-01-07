import type { Cleavage } from '../entities/Cleavage'
import type { InterfaceView } from '../entities/InterfaceView'
import type { InterfaceGateway } from '../ports/InterfaceGateway'

export class InterfaceApplicationService {
    constructor (private interfaceGateway:InterfaceGateway) {}
    updateCleavageTitle (cleavage: Cleavage):Promise<void> {
        return this.interfaceGateway.updateCleavage(cleavage)
    }

    changeView (interfaceView: InterfaceView): Promise<void> {
        return this.interfaceGateway.changeView(interfaceView)
    }
}
