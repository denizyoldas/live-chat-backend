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
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    return res.status(200).json(result);
  }

  @Post('register')
  async register(@Body() user: RegisterDto, @Response() res: any) {
    this.authService.register(user);
    return res.status(200).json({ message: 'success' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
