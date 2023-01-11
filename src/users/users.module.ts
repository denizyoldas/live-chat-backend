import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SharedModule],
  exports: [UsersService],
})
export class UsersModule {}
