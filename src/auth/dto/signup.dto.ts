import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    primeiroNome: string;

    @IsString()
    @IsNotEmpty()
    sobreNome: string;
}