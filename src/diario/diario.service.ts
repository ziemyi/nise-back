import { Injectable } from "@nestjs/common";
import CriarDiarioDto from "./dto/diario.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Diario, Prisma } from "@prisma/client";

@Injectable()
export class DiarioService {

    constructor(
        private prismaService: PrismaService
    ){}

    async getDiarios(idPaciente : { idPaciente : string }){

        let diarios : Prisma.PacienteGetPayload<{
            select: {
                diarios: true
            }
        }>
        const idPacienteComoNumber = parseInt(idPaciente.idPaciente)
        try{
            diarios = await this.prismaService.paciente.findUnique({
                where: {
                    id: idPacienteComoNumber
                },
                select: {
                    diarios: true
                }
            })
        } catch(error){
            console.log(error)
            return error
        }

        return diarios
    }

    async criardiario(dto: CriarDiarioDto){

        const diario = await this.prismaService.diario.create({
            data: {    
                titulo: dto.titulo,
                descricao: dto.descricao,
                idPaciente: dto.idPaciente
            },
            include:{
                paciente:{
                    select:{
                        primeiroNome: true,
                        sobreNome: true
                    }
                }
            }
        });

        return diario
    }
}