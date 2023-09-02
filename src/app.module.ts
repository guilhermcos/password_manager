import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { CredentialModule } from './credential/credential.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    CredentialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}