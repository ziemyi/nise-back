import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArtigoDTO{
    @IsString()
    titulo: string
    
    @IsString()
    resumo: string
    
    @IsString()
    conteudo: string
    
    @IsNumber()
    @IsNotEmpty()
    idPsicologo: number
}