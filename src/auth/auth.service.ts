import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({
      username,
    });
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: { username: string; pass: string }) {
    const result = await this.validateUser(user.username, user.pass);

    if (!result) {
      return null;
    }

    return {
      access_token: this.jwtService.sign(result),
    };
  }

  async register(user: any) {
    return this.usersService.createUser(user);
  }
}
