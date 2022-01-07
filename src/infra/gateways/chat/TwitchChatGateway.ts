import { MessageForPlayer } from '../../../domain/entities/MessageForPlayer';
import { ChatGateway } from '../../../domain/ports/ChatGateway';
export class TwitchChatGateway implements ChatGateway {
    sendMessageToPlayer(messageForPlayer: MessageForPlayer): Promise<void> {
        throw new Error('Method not implemented.');
    }
    disconnect(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    isConnected(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    connect(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
