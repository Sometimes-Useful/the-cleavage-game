import { ApplicationNotification } from '../../../domain/entities/notification/Notification'
import { NotificationGateway } from '../../../domain/ports/NotificationGateway'

export class FakeNotificationGateway implements NotificationGateway {
    notify (notification:ApplicationNotification): Promise<void> {
        this.notifications.push(notification)
        return Promise.resolve()
    }

    notifications: ApplicationNotification[] = [];
}
