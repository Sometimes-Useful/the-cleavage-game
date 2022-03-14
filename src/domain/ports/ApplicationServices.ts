import type { ChatApplicationService } from '../applicationServices/ChatApplicationService'
import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import type { EventApplicationService } from '../applicationServices/EventApplicationService'
import type { CleavageApplicationService } from '../applicationServices/CleavageService'
import type { PlayerApplicationService } from '../applicationServices/PlayerApplicationService'
import type { AutoplayApplicationService } from '../applicationServices/AutoplayApplicationService'
import type { GlobalCleavageDrawPileApplicationService } from '../applicationServices/GlobalCleavageDrawPileApplicationService'
import type { BarApplicationService } from '../applicationServices/BarApplicationService'

export interface ClientApplicationServices {
    player: PlayerApplicationService
    chat: ChatApplicationService;
    interface: InterfaceApplicationService;
    event: EventApplicationService;
    cleavage: CleavageApplicationService;
    autoplay: AutoplayApplicationService
    bar:BarApplicationService
}

export interface ServerApplicationServices {
    globalCleavageDrawPile:GlobalCleavageDrawPileApplicationService
}
