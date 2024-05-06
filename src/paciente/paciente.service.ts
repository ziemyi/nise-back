import { Injectable } from "@nestjs/common";
import { UpdateDto } from "src/auth/dto/update.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PacienteService {
    constructor(private prisma:PrismaService) { }

    async remove(id: number){
        return await this.prisma.paciente.delete({
            where:{
                id: Number(id),
            },
        });
    }

    async update(id: number, data: UpdateDto){
        return this.prisma.paciente.update({
            where: { id },
            data
        })
    }
}