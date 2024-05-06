import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DiarioService } from "./diario.service";
import CriarDiarioDto from "./dto/diario.dto";


@Controller("diarios")
export class DiarioController{
    constructor(
        private diarioService : DiarioService
    ){}

    @Get(":idPaciente")
    getDiarios(
        @Param() idPacienteObject : { idPaciente: string }
    ){
        return this.diarioService.getDiarios(idPacienteObject)
    }

    @Post()
    criarDiario(@Body() criarDiarioDto : CriarDiarioDto){
        return this.diarioService.criardiario(criarDiarioDto)
    }
}