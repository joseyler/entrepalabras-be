import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DBService } from '../../common/services/db.service';
import reportesQueries from './queries/reportes.queries';
import { CriterioReportePalabras } from '../model/criterios.reporte';

@Injectable()
export class PalabrasService {
  constructor(private dbService: DBService) {}

  async getReporteJugadasDiarias(criterioBusqueda: CriterioReportePalabras) {
    const limmit: number = criterioBusqueda.tamanio;
    const offset: number =
      (criterioBusqueda.pagina - 1) * criterioBusqueda.tamanio;
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      reportesQueries.reportePalabras(
        criterioBusqueda.orderBy,
        criterioBusqueda.direction,
      ),
      [limmit, offset],
    );
    const resultQueryTotal: RowDataPacket[] = await this.dbService.executeSelect(
        reportesQueries.reportePalabrasTotal,
        [],
      );
    return {
      data: resultQuery,
      paginado: {
        pagina: criterioBusqueda.pagina,
        tamanio: criterioBusqueda.tamanio,
        registrosTotales: resultQueryTotal[0].registrosTotales,
      },
    };
  }
}
