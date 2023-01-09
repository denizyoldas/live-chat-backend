import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [ChatModule],
  providers: [EventsGateway],
})
export class EventsModule {}
