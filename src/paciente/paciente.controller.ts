import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { JwtGuard } from "../auth/guard";
import { GetPaciente } from "src/auth/decorator";
import { Paciente } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('paciente')
export class PacienteController {

    @Get('me')
    getMe(@GetPaciente() user: Paciente) {
        return user;
    }

    @Patch()
    editPaciente() {}
}