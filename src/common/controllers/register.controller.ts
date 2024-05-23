import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterService } from '../services/register.service';

@Controller('/register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @HttpCode(200)
  async Register(@Body() body: { email: string; password: string }) {
    return await this.registerService.register(body);
  }
}
