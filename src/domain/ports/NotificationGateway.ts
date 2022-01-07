import { ApplicationNotification } from "../entities/notification/Notification";

export interface NotificationGateway {
    notify(notification:ApplicationNotification): Promise<void>;
}
