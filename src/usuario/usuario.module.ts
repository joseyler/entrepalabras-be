import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { CommonModule } from 'src/common/common.module';
// import { UsuarioService } from './usuario.service';
// import { CommonModule } from 'src/common/common.module';
// import { UsuarioController } from './usuario.controller';

@Module({
  imports: [CommonModule],
  controllers: [UsuarioController],
  providers: [],
})
export class UsuarioModule {}
