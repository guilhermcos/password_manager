import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CardRepository } from './card.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CardController],
  providers: [CardService, CardRepository],
})
export class CardModule {}
