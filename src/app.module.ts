import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
