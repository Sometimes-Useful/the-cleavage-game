import type { ApplicationEvent } from '../events/GameEvent'

export const eventNotSupported = (event: ApplicationEvent): string => `Event '${event.eventType}' is not supported by application.`
