import type { MessageForPlayer } from '../entities/MessageForPlayer'
export interface ChatGateway {
    sendMessageToPlayer(messageForPlayer: MessageForPlayer): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): Promise<boolean>;
    connect(username:string, token:string, channel:string): Promise<void>;
}
