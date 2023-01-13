import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Request,
  Post,
  Response,
  Get,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto, @Res() res) {
    const result = await this.authService.login({
      username: user.username,
      pass: user.password,
    });

    if (!result) {
      res.status(401).json({ message: ['password or username is wrong'] });
      return;
    }

    return res.status(200).json(result);
  }

  @Post('register')
  async register(@Body() user: RegisterDto, @Response() res: any) {
    const result = await this.authService.register(user);

    if (!result) {
      res.status(400).json({ message: ['Email Or Username Already Exist'] });
      return;
    }

    return res.status(200).json({ message: 'success', result });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('refresh-token')
  async refreshToken(@Request() req: any, @Response() res: any) {
    const result = await this.authService.login({
      username: req.user.username,
      pass: req.user.password,
    });

    if (!result) {
      res.status(401).json({ message: ['password or username is wrong'] });
      return;
    }

    return res.status(200).json(result);
  }
}
