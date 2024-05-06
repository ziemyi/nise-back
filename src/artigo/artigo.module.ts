import { Module } from "@nestjs/common";
import { ArtigoService } from "./artigo.service";
import { ArtigoController } from "./artigo.controller";


@Module({
    providers: [ArtigoService],
    controllers: [ArtigoController]
})
export class ArtigoModule{}