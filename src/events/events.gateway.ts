import { ChatService } from './../chat/chat.service';
import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const USERS: Map<string, string> = new Map();

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleDisconnect(client: any) {
    USERS.delete(client.id);
    this.server.emit('users', Array.from(USERS.values()));
  }

  @SubscribeMessage('join')
  async identity(
    client: any,
    payload: {
      userId: string;
      userName: string;
      userAvatar: string;
    },
  ) {
    USERS.set(client.id, payload.userName);
    this.server.emit('users', Array.from(USERS.values()));
  }

  @SubscribeMessage('msg')
  async handleMessage(
    @MessageBody()
    data: {
      message: string;
      userId: string;
      userName: string;
      userAvatar: string;
    },
  ): Promise<string> {
    const userData = {
      message: data.message,
      sender: {
        id: data.userId,
        name: data.userName,
        avatar: data.userAvatar,
      },
      timestamp: Date.now(),
    };

    this.server.emit('msg', userData);
    this.chatService.create(userData as any);

    return data.message;
  }
}
