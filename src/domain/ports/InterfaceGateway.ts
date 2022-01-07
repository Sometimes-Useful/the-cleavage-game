import type { Cleavage } from '../entities/Cleavage'
import type { InterfaceView } from '../entities/InterfaceView'

export interface InterfaceGateway {
    updateCleavage(cleavage: Cleavage): Promise<void>;
    changeView(interfaceView: InterfaceView): Promise<void>;
}
