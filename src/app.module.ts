import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [EventsModule, UsersModule, AuthModule, ChatModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
