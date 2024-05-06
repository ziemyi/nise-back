import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ArtigoService } from "./artigo.service";
import { CreateArtigoDTO } from "./dto/createartigo.dto";


@Controller("artigos")
export class ArtigoController{
    
    constructor(
        private artigoService : ArtigoService
    ){}

    @Post()
    createNewArtigo(@Body() createArtigoDto : CreateArtigoDTO){
        return this.artigoService.createNewArtigo(createArtigoDto)
    }

    //GET http://localhost:3000/artigos/1

    @Get(":id")
    getArtigoById(
        @Param() idArtigo : { id: string }
    ){
        return this.artigoService.getArtigoById(idArtigo)
    }

}