import { InterfaceView } from "../../../domain/entities/InterfaceView";
import { InterfaceGateway } from "../../../domain/ports/InterfaceGateway";

export class SvelteInterfaceGateway implements InterfaceGateway {
    updateCleavageTitle(cleavageTitle: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeView(interfaceView: InterfaceView): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
