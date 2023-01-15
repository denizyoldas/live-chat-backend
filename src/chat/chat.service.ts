import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

const guidGenerator = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

let CONVERSATIONS: any[] = [
  {
    id: guidGenerator(),
    userIds: ['1', '2'],
    messages: [
      {
        chatId: 1,
        message: 'Hello',
        sender: 'denizyoldas',
        timestamp: Date.now(),
      },
      {
        chatId: 2,
        message: 'Hello',
        sender: 'denizyoldas2',
        timestamp: Date.now(),
      },
    ],
  },
];

@Injectable()
export class ChatService {
  constructor(private userService: UsersService) {}

  async addMessage(message: any) {
    const chat = CONVERSATIONS.find((chat) => chat.id === message.chatId);
    if (chat) {
      chat.messages.push({
        chatId: randomUUID(),
        ...message,
      });
    }
  }

  async createConversation(createChatDto: CreateChatDto) {
    const user = await this.userService.user({
      username: createChatDto.username,
    });

    if (!user) {
      return false;
    }

    const chatExists = CONVERSATIONS.find((chat) => {
      return (
        chat.userIds.includes(createChatDto.userId) &&
        chat.userIds.includes(user.id)
      );
    });

    if (chatExists) {
      return chatExists.id;
    }

    const chat = {
      id: guidGenerator(),
      userIds: [createChatDto.userId, user.id],
      messages: [],
    };
    CONVERSATIONS.push(chat);

    return true;
  }

  findAll() {
    return CONVERSATIONS;
  }

  deleteAll() {
    if (CONVERSATIONS.length > 0) {
      CONVERSATIONS = [];
      return 'Deleted all chats';
    }
  }

  createMessage(createMessageDto: CreateMessageDto) {
    const chatId = createMessageDto.chatId;
    const chat = CONVERSATIONS.find((chat) => chat.id === chatId);
    if (chat) {
      chat.messages.push(createMessageDto);
      return 'Message added';
    }
  }

  async getConversations(userId: string) {
    const conversations = await Promise.all(
      CONVERSATIONS.filter((chat) => chat.userIds.includes(userId)).map(
        async (chat) => {
          const otherUser = chat.userIds.find((id) => id !== userId);
          const user = await this.userService.user({ id: otherUser });
          return {
            id: chat.id,
            username: user.username,
            avatar: user.avatar,
            lastMessage: chat.messages[chat.messages.length - 1],
          };
        },
      ),
    );

    return conversations;
  }

  async getChatHistory(chatId: string) {
    const chat = CONVERSATIONS.find((chat) => chat.id === chatId);
    if (chat) {
      const messages = await Promise.all(
        chat.messages.map(async (message) => {
          const user = await this.userService.user({
            username: message.sender,
          });
          return {
            ...message,
            sender: user,
          };
        }),
      );
      return messages;
    }
  }
}
