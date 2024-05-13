import { Module } from '@nestjs/common';
import { AdministradorModule } from './administrador/administrador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AdministradorModule, UsuarioModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
