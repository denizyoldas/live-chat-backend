import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('chat')
@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get('delete')
  deleteAll() {
    return this.chatService.deleteAll();
  }
}
