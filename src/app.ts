import { ChatApplicationService } from './domain/applicationServices/ChatApplicationService'
import { CleavageApplicationService } from './domain/applicationServices/CleavageService'
import { EventApplicationService } from './domain/applicationServices/EventApplicationService'
import { InterfaceApplicationService } from './domain/applicationServices/InterfaceApplicationService'
import type { ProductionApplicationGateways } from './domain/ports/ApplicationGateways'
import type { ProductionApplicationRepositories } from './domain/ports/ApplicationRepositories'
import { ProductionApplication } from './infra/applications/ProductionApplication'
import { TwitchChatGateway } from './infra/gateways/chat/TwitchChatGateway'
import { InMemoryProductionEventGateway } from './infra/gateways/event/InMemoryProductionEventGateway'
import { SvelteInterfaceGateway } from './infra/gateways/interface/SvelteInterfaceGateway'
import { InMemoryCleavageRepository } from './infra/repositories/cleavage/InMemoryCleavageRepository'
import { applicationEventStore } from './ui/stores/stores'

const eventGateway = new InMemoryProductionEventGateway()
const applicationGateways:ProductionApplicationGateways = {
    chat: new TwitchChatGateway(eventGateway),
    event: eventGateway,
    interface: new SvelteInterfaceGateway()
}
const applicationRepositories:ProductionApplicationRepositories = {
    cleavage: new InMemoryCleavageRepository()
}
eventGateway.configureController({
    chat: new ChatApplicationService(applicationGateways.chat, applicationGateways.interface),
    event: new EventApplicationService(applicationGateways.event),
    cleavage: new CleavageApplicationService(applicationRepositories.cleavage, applicationGateways.chat),
    interface: new InterfaceApplicationService(applicationGateways.interface)
})
const application = new ProductionApplication(
    applicationGateways,
    applicationRepositories
)

export const applicationStart = () => {
    console.log('application started')
    applicationEventStore.subscribe(event => {
        if (event) application.gateways.event.sendEvent(event)
    })
}
