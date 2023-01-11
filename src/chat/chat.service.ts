import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';

let CHATS: any[] = [];

@Injectable()
export class ChatService {
  create(createChatDto: CreateChatDto) {
    CHATS.push(createChatDto);
  }

  findAll() {
    return CHATS;
  }

  deleteAll() {
    if (CHATS.length > 0) {
      CHATS = [];
      return 'Deleted all chats';
    }
  }

  createMessage(createMessageDto: any) {
    return '';
  }
}
