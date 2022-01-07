import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'

export interface ApplicationServices {
    chat: ChatApplicationService;
    interface: InterfaceApplicationService;
    event: EventApplicationService;
    cleavage: CleavageApplicationService;
}
