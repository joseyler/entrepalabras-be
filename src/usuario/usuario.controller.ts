import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtMiddlewareGuard } from 'src/common/middleware/auth-guard';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  @UseGuards(JwtMiddlewareGuard)
  async getAll() {
    return await this.usuarioService.getAll();
  }
}
