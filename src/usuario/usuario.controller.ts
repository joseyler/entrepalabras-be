import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/middleware/auth-guard';

@Controller('/usuarios')
@UseGuards(JwtMiddlewareGuard)
export class UsuarioController {
  constructor() {}

  @Get('/info')
  async getInformacionUsuario(@Req() request) {
    return request.user;
  }

  @Get()
  async getAll() {
    // return await this.usuarioService.getAll();
  }
}
