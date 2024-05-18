import { Injectable } from '@nestjs/common';
import usuarioQueries from './queries/usuario.queries';
import { RowDataPacket } from 'mysql2';
import { DBService } from 'src/common/services/db.service';

@Injectable()
export class UsuarioService {
  constructor(private dbService: DBService) {}
  async getAll() {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      usuarioQueries.selectAll,
      [],
    );
    const usuarios = resultQuery.map((rs: RowDataPacket) => {
      return {
        id: rs['usuarioID'],
        email: rs['email'],
        activo: rs['activo'],
      };
    });
    return usuarios;
  }
}
