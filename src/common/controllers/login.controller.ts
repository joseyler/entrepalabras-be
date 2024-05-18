import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service';

@Controller('/login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() body: { email: string; password: string }) {
    return await this.loginService.login(body);
  }
}
