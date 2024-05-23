import { Injectable } from "@nestjs/common";
import { DBService } from "./db.service";
import { ResultSetHeader } from "mysql2";
import usuarioQueries from "src/usuario/queries/usuario.queries";

@Injectable()
export class RegisterService {

    constructor(
        private dbService: DBService,
    ) {}

    async register(user:any):Promise<any>{
        const resultQuery: ResultSetHeader = await this.dbService.executeQuery(usuarioQueries.registerUser,user)
        return resultQuery;
    }
}