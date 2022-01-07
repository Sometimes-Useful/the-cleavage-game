import { ChatApplicationService } from './domain/applicationServices/ChatApplicationService'
import { CleavageApplicationService } from './domain/applicationServices/CleavageService'
import { EventApplicationService } from './domain/applicationServices/EventApplicationService'
import { InterfaceApplicationService } from './domain/applicationServices/InterfaceApplicationService'
import { ProductionApplicationGateways } from './domain/ports/ApplicationGateways'
import { ProductionApplicationRepositories } from './domain/ports/ApplicationRepositories'
import { ProductionApplication } from './infra/applications/ProductionApplication'
import { TwitchChatGateway } from './infra/gateways/chat/TwitchChatGateway'
import { InMemoryProductionEventGateway } from './infra/gateways/event/InMemoryProductionEventGateway'
import { SvelteInterfaceGateway } from './infra/gateways/interface/SvelteInterfaceGateway'
import { SvelteNotificationGateway } from './infra/gateways/notification/SvelteNotificationGateway'
import { InMemoryCleavageRepository } from './infra/repositories/cleavage/InMemoryCleavageRepository'

const eventGateway = new InMemoryProductionEventGateway()
const applicationGateways:ProductionApplicationGateways = {
    chat: new TwitchChatGateway(),
    notification: new SvelteNotificationGateway(),
    event: eventGateway,
    interface: new SvelteInterfaceGateway()
}
const applicationRepositories:ProductionApplicationRepositories = {
    cleavage: new InMemoryCleavageRepository()
}
eventGateway.configureController({
    chat: new ChatApplicationService(applicationGateways.chat, applicationGateways.notification),
    event: new EventApplicationService(applicationGateways.event),
    cleavage: new CleavageApplicationService(applicationRepositories.cleavage, applicationGateways.chat),
    interface: new InterfaceApplicationService(applicationGateways.interface)
})
export const application = new ProductionApplication(
    applicationGateways,
    applicationRepositories
)
