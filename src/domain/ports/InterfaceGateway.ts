import { InterfaceView } from "../entities/InterfaceView";

export interface InterfaceGateway {
    updateCleavageTitle(cleavageTitle: string): Promise<void>;
    changeView(interfaceView: InterfaceView): Promise<void>;
}
