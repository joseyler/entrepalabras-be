import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/middleware/auth-guard';
import { PalabrasService } from '../services/palabras.service';
import { CriterioReportePalabras } from '../model/criterios.reporte';

@Controller('/admin/palabras')
export class PalabrasController {
  constructor(private palabrasService: PalabrasService) {}

  @Get('/all')
  async getTodasPalabras(@Req() request) {
    return request.user;
  }

  @Post('/diaria')
  async crearPalabraDiaria(@Req() request) {
    return request.user.usuarioID;
  }

  @Get('/jugadasdiarias')
  async getReporteJugadasDiarias(
    @Query('orderBy') orderBy: string,
    @Query('direction') direction: string,
    @Query('pagina') pagina: string,
    @Query('tamanio') tamanio: string,
  ) {
    const criterioBusqueda: CriterioReportePalabras = {
      direction: direction || 'desc',
      orderBy: orderBy || 'fecha',
      pagina: pagina ? Number(pagina) : 1,
      tamanio: tamanio ? Number(tamanio) : 50,
    };
    return this.palabrasService.getReporteJugadasDiarias(criterioBusqueda);
  }
}
