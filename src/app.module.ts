import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PacienteModule } from './paciente/paciente.module';
import { DiarioModule } from './diario/diario.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ArtigoModule } from './artigo/artigo.module';





@Module({
  imports: [
    AuthModule,
    PacienteModule,
    DiarioModule,
    PrismaModule,
    ConfigModule.forRoot({isGlobal: true,}),
    ArtigoModule
  ],
})
export class AppModule {}
