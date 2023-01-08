import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, pass: string): Promise<any> {
    const user = { username, password: pass };
    if (user && user.password === 'test') {
      delete user.password;
      return user;
    }
    return null;
  }
}
