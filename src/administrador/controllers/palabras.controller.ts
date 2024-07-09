import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtMiddlewareGuard } from 'src/common/middleware/auth-guard';
import { PalabrasService } from '../services/palabras.service';
import { CriterioReportePalabras } from '../model/criterios.reporte';
import { ValueType, Workbook } from 'exceljs';

@Controller('/admin/palabras')
export class PalabrasController {
  constructor(private palabrasService: PalabrasService) { }

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

  @Get('/jugadasdiarias/export/xls')
  async exportReporteJugadasDiarias(
    @Query('orderBy') orderBy: string,
    @Query('direction') direction: string,
    @Res() res,
  ) {
    const criterioBusqueda: CriterioReportePalabras = {
      direction: direction || 'desc',
      orderBy: orderBy || 'fecha',
      pagina: 1,
      tamanio: 50000,
    };
    const resultadoQuery =
      await this.palabrasService.getReporteJugadasDiarias(criterioBusqueda);

    const headers = [
      {
        header: 'Fecha',
        key: 'fecha',
        type: ValueType.String,
        width: 100,
      },
      {
        header: 'Palabra',
        key: 'palabra',
        type: ValueType.String,
        width: 200,
      },
      {
        header: 'Intentos Maximos',
        key: 'maxIntentos',
        type: ValueType.Number,
        width: 120,
      },
      {
        header: 'Jugadas',
        key: 'cantidadJugadas',
        type: ValueType.Number,
        width: 120,
      },
    ];

    const workbook: Workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Jugadas');
    worksheet.columns = headers;
    worksheet.addRows(resultadoQuery.data);

    worksheet.columns.forEach((column) => {
      const currentColumn = column;
      const lengths = column.values.map((v) => v.toString().length);
      const maxLength = Math.max(
        ...lengths.filter((v) => typeof v === 'number'),
      );
      currentColumn.width = maxLength + 5;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=jugadas.xlsx');
    return res.send(buffer);
  }
}
