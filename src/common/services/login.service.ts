import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DBService } from './db.service';
import { JwtService } from '@nestjs/jwt';
import usuarioQueries from 'src/usuario/queries/usuario.queries';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  salt: string = '$2a$08$W59jWcwio1TiLx4A8iRyTO';
  constructor(
    private dbService: DBService,
    private jwtService: JwtService,
  ) {}

  async generateHash(pw: string) {
    // funcion utilitaria para generar el hash de un string
    const hash = await bcrypt.hash(pw, 10);
    return hash;
  }

  async login(user: any) {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(
      usuarioQueries.selectByEmail,
      [user.username],
    );

    if (resultQuery.length === 0) {
      throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED);
    }

    const dbUser = {
      email: resultQuery[0].email,
      password: resultQuery[0].password,
      role: resultQuery[0].codigo,
    };

    const isValidPassword = await bcrypt.compare(
      user.password,
      dbUser.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED);
    }

    return this.getAccessToken(dbUser);
  }

  getAccessToken(user: any) {
    const payload = { email: user.email, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
