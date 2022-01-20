import { ChatApplicationService } from './domain/applicationServices/ChatApplicationService'
import { CleavageApplicationService } from './domain/applicationServices/CleavageService'
import { EventApplicationService } from './domain/applicationServices/EventApplicationService'
import { InterfaceApplicationService } from './domain/applicationServices/InterfaceApplicationService'
import { ApplicationStartEvent } from './domain/events/applicationStart/ApplicationStartEvent'
import type { ProductionApplicationGateways } from './domain/ports/ApplicationGateways'
import type { ProductionApplicationRepositories } from './domain/ports/ApplicationRepositories'
import { ProductionApplication } from './infra/applications/ProductionApplication'
import { TwitchChatGateway } from './infra/gateways/chat/TwitchChatGateway'
import { InMemoryProductionEventGateway } from './infra/gateways/event/InMemoryProductionEventGateway'
import { SvelteAndToneInterfaceGateway } from './infra/gateways/interface/SvelteAndToneInterfaceGateway'
import { InMemoryCleavageRepository } from './infra/repositories/cleavage/InMemoryCleavageRepository'
import { applicationEventStore } from './ui/stores/stores'

export const applicationStart = ():Promise<void> => {
    const eventGateway = new InMemoryProductionEventGateway()
    const interfaceGateway = new SvelteAndToneInterfaceGateway()
    const applicationGateways:ProductionApplicationGateways = {
        chat: new TwitchChatGateway(eventGateway),
        event: eventGateway,
        interface: interfaceGateway
    }

    const applicationRepositories:ProductionApplicationRepositories = {
        cleavage: new InMemoryCleavageRepository()
    }
    const application = new ProductionApplication(applicationGateways, applicationRepositories)
    console.log('application started')
    return interfaceGateway.load()
        .then(() => {
            eventGateway.configureController({
                chat: new ChatApplicationService(applicationGateways.chat, applicationGateways.interface),
                event: new EventApplicationService(applicationGateways.event),
                cleavage: new CleavageApplicationService(applicationRepositories.cleavage, applicationGateways.chat),
                interface: new InterfaceApplicationService(applicationGateways.interface)
            })
            applicationEventStore.subscribe(event => { if (event) application.gateways.event.sendEvent(event) })
            applicationEventStore.set(new ApplicationStartEvent())
            return Promise.resolve()
        })
        .catch(error => console.error(error))
}
