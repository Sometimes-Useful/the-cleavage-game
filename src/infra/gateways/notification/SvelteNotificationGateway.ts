import type { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import type { NotificationGateway } from '../../../domain/ports/NotificationGateway'

export class SvelteNotificationGateway implements NotificationGateway {
    notify (notification: ApplicationNotification): Promise<void> {
        console.log(notification.message)
        return Promise.resolve()
    }
}
