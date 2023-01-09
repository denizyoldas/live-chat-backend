import { ChatService } from './../chat/chat.service';
import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

const USERS: any[] = [];

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
    const userId = client.handshake.auth.token;
    console.log('Disconnected: ', userId);

    const index = USERS.findIndex((user) => user.userId === userId);
    if (index !== -1) {
      USERS.splice(index, 1);

      this.server.emit('leave', userId);
    }
  }

  @SubscribeMessage('join')
  async identity(
    @MessageBody()
    data: {
      userId: string;
      userName: string;
      userAvatar: string;
    },
  ) {
    USERS.push(data);

    this.server.emit('join', data);
    return data;
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
