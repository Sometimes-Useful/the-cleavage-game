import { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import { NotificationGateway } from '../../../domain/ports/NotificationGateway'

export class SvelteNotificationGateway implements NotificationGateway {
    notify (notification: ApplicationNotification): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
