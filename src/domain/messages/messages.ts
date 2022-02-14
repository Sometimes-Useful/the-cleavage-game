import type { ApplicationEvent } from '../events/GameEvent'
import type { PrimaryClientController } from '../ports/primary/PrimaryClientController'
import type { PrimaryServerCommandController } from '../ports/primary/PrimaryServerController'
import type { PrimaryServerQueryController } from '../ports/primary/PrimaryServerQueryController'

export const eventNotSupported = (event: ApplicationEvent, controller:PrimaryClientController|PrimaryServerCommandController|PrimaryServerQueryController): string => `Event '${event.eventType}' is not supported by ${controller.constructor.name}.`
