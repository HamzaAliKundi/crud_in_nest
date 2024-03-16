import { AuthService } from './auth.service';
import { IAuth } from '../interfaces/auth.interface';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() user: IAuth) {
    return await this.authService.registerUser(user);
  }

  @Post('login')
  async loginUser(@Body() user: IAuth) {
    return await this.authService.loginUser(user);
  }
}
