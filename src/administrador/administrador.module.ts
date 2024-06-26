import { Module } from '@nestjs/common';
import { PalabrasController } from './controllers/palabras.controller';
import { PalabrasService } from './services/palabras.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [PalabrasController],
  providers: [PalabrasService],
})
export class AdministradorModule {}
