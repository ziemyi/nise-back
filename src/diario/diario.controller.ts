import { Body, Controller, Post } from "@nestjs/common";
import { DiarioService } from "./diario.service";
import CriarDiarioDto from "./dto/diario.dto";


@Controller("diario")
export class DiarioController{
    constructor(
        private diarioService : DiarioService
    ){}

    @Post("criar")
    criarDiario(@Body() criarDiarioDto : CriarDiarioDto){
        return this.diarioService.criardiario(criarDiarioDto)
    }
}