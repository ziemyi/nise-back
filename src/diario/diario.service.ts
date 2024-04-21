import { Injectable } from "@nestjs/common";
import CriarDiarioDto from "./dto/diario.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DiarioService {

    constructor(
        private prismaService: PrismaService
    ){}
    async criardiario(dto: CriarDiarioDto){

        const diario = await this.prismaService.diario.create({
            data: {    
                titulo: dto.titulo,
                descricao: dto.descricao,
                idPaciente: dto.idPaciente
            }
        });

        return diario
    }
}