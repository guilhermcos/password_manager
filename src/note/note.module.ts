import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { NoteRepository } from './note.repository';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
})
export class NoteModule {}
