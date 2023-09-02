import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';
import { JwtModule } from '@nestjs/jwt';
import { CredentialRepository } from './credential.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [JwtModule, PrismaModule],
  controllers: [CredentialController],
  providers: [CredentialService, CredentialRepository],
})
export class CredentialModule {}
