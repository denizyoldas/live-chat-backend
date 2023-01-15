import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('chat')
@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto, @Res() res) {
    const result = await this.chatService.createConversation(createChatDto);

    if (result) {
      return res.status(200).json({ message: 'Chat created', result });
    }

    return res.status(400).json({ message: 'User not found' });
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

  @Get('conversations/:userId')
  async getChatList(@Param('userId') userId: string, @Res() res) {
    const result = await this.chatService.getConversations(userId);

    if (result) {
      return res.status(200).json(result);
    }

    return res.status(400).json({ message: ['User not found'] });
  }

  @Get('history/:chatId')
  async getChatHistory(@Param('chatId') chatId: string, @Res() res) {
    const result = await this.chatService.getChatHistory(chatId);

    if (result) {
      return res.status(200).json(result);
    }

    return res.status(400).json({ message: ['Chat not found'] });
  }
}
