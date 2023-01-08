import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
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
    return data.message;
  }
}
