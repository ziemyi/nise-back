import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateArtigoDTO } from "./dto/createartigo.dto";
import { Artigo, Prisma } from "@prisma/client";


@Injectable()
export class ArtigoService{
    
    constructor(
        private prismaService : PrismaService
    ){}

    
    async createNewArtigo(createArtigoDto : CreateArtigoDTO){
        //criar artigo no bacno de dados
        let artigoCriado : any
        try{
            artigoCriado = await this.prismaService.artigo.create({
                data: {
                    conteudoArtigo: createArtigoDto.conteudo,
                    resumoArtigo: createArtigoDto.resumo,
                    tituloArtigo: createArtigoDto.titulo,
                    idPsicologo: createArtigoDto.idPsicologo
                },
                include: {
                    psicologo: {
                        select: {
                            nomePsicologo: true
                        }
                    }
                }
            })
        } catch(error){
            return error
        }

        return artigoCriado
    }

    async getArtigoById(idArtigo : { id: string }){
        let artigoDesejado : Prisma.ArtigoGetPayload<{
            include:{
                psicologo: {
                    select: {
                        nomePsicologo: true
                    }
                }
            }
        }>
        const idArtigoNumber : number = parseInt(idArtigo.id)
        try{
            artigoDesejado = await this.prismaService.artigo.findUnique({
                where: {
                    idArtigo: idArtigoNumber
                },
                include: {
                    psicologo: {
                        select: {
                            nomePsicologo: true
                        }
                    }
                }
            })
        } catch(error){
            console.log(error)
            return error
        }

        return artigoDesejado
    }
    
}