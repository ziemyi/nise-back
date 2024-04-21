import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PacienteModule } from './paciente/paciente.module';
import { DiarioModule } from './diario/diario.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';





@Module({
  imports: [
    AuthModule,
    PacienteModule,
    DiarioModule,
    PrismaModule,
    ConfigModule.forRoot({isGlobal: true,}),
  ],
})
export class AppModule {}
