import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CommonModule } from 'src/common/common.module';
import { UsuarioController } from './usuario.controller';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports: [CommonModule],
})
export class UsuarioModule {}
