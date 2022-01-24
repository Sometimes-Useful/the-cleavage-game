import type { Message } from '../entities/message'
import type { MessageForPlayer } from '../entities/MessageForPlayer'
export interface ChatGateway {
    sendMessage(message: Message): Promise<void>;
    sendMessageToPlayer(messageForPlayer: MessageForPlayer): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): Promise<boolean>;
    connect(username:string, token:string, channel:string): Promise<void>;
}
