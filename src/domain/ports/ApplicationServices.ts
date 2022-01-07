import { ChatApplicationService } from '../applicationServices/ChatApplicationService';
import { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService';
import { EventApplicationService } from '../applicationServices/EventApplicationService';
import { CleavageApplicationService } from '../applicationServices/CleavageService';

export interface ApplicationServices {
    chat: ChatApplicationService;
    interface: InterfaceApplicationService;
    event: EventApplicationService;
    cleavage: CleavageApplicationService;
}
