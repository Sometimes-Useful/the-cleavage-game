import { UseCase } from "./UseCase";
import { InterfaceApplicationService } from "../applicationServices/InterfaceApplicationService";
import { InterfaceView } from "../entities/InterfaceView";
import { ChatApplicationService } from "../applicationServices/ChatApplicationService";
import { LaunchCleavageEvent } from "../events/launchCleavage/LaunchCleavageEvent";
import { CleavageApplicationService } from "../applicationServices/CleavageService";
import { Cleavage } from "../entities/Cleavage";

export class LaunchCleavage extends UseCase {
    constructor(private interfaceApplicationService: InterfaceApplicationService, private chatApplicationService:ChatApplicationService, private cleavageApplicationService:CleavageApplicationService) {
        super();
    }
    execute(event: LaunchCleavageEvent): Promise<void> {
        return this.chatApplicationService.isConnected() 
        .then(isConnected => isConnected
            ? this.onConnected(event)
            : this.interfaceApplicationService.changeView(InterfaceView.CONNECT_CHAT)
        )
        .catch(error => Promise.reject(error))
    }

    private onConnected(event:LaunchCleavageEvent): Promise<void> {
        const cleavage = new Cleavage(event.cleavageTitle)
        return this.cleavageApplicationService.saveCleavage(cleavage)
            .then(()=>this.interfaceApplicationService.updateCleavageTitle(cleavage.title))
            .then(()=>this.interfaceApplicationService.changeView(InterfaceView.CURRENT_CLEAVAGE))
            .catch(error => Promise.reject(error))
    }
}

