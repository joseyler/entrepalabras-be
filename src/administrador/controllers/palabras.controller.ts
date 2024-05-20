import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/middleware/auth-guard';

@Controller('/admin/palabras')
@UseGuards(JwtMiddlewareGuard)
export class UsuarioController {
  constructor() {}

  @Get('/all')
  async getTodasPalabras(@Req() request) {
    return request.user;
  }

  @Post('/diaria')
  async crearPalabraDiaria(@Req() request) {
    return request.user.usuarioID;
  }
}
