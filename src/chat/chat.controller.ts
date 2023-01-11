import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  deleteAll() {
    return this.chatService.deleteAll();
  }

  @Post('message')
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.chatService.createMessage(createMessageDto);
  }
}
