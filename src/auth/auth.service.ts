import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignupDto } from "./dto/signup.dto";
import  SigninDto  from "./dto/signin.dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signup(dto: SignupDto) : Promise<{
        token: string
    }> {
        //gerar senha hash
        const hash = await argon.hash(dto.password);

        //salvar usuario no bd
        try {
            const paciente = await this.prisma.paciente.create({
                data: {
                    email: dto.email,
                    hash, 
                    primeiroNome: dto.primeiroNome,
                    sobreNome: dto.sobreNome

                }, 
            });

            //retornar os usuarios salvos
            return {
                token: await this.signToken(paciente.id, paciente.email)
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credenciais em uso',
                    );
                }
            }
            throw error;
        }
    }

    async signin(dto: SigninDto) : Promise<{
        token: string,
        id: number
    }> {

        //pegar o usuario pelo email
        const paciente = await this.prisma.paciente.findUnique({
            where: {
                email: dto.email
            },
        });
        //lançar exceção caso o usuario não exista
        if (!paciente) throw new ForbiddenException('Email ou senha incorreto');

        //comparar senhas
        const compararSenha = await argon.verify(paciente.hash, dto.password);

        //lançar exceção caso a senha esteja errada
        if(!compararSenha) throw new ForbiddenException('Email ou senha incorreto');

        //mandar usuario de volta
        return {
            token: await this.signToken(paciente.id, paciente.email),
            id: paciente.id
        }
    }

    async signToken(pacienteId: number, email: string): Promise<string> {
        const payload = {
            sub: pacienteId,
            email
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            },
        );

        return token
    }
}