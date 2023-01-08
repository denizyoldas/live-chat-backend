import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [EventsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
