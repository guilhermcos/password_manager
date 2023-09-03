import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: number, createNoteDto: CreateNoteDto) {
    return await this.prisma.$transaction(async (tx) => {
      const note = await tx.note.findFirst({
        where: {
          userId,
          title: createNoteDto.title,
        },
      });
      if (note) throw new ConflictException();

      return await tx.note.create({
        data: { userId, ...createNoteDto },
      });
    });
  }

  async findAll(userId: number) {
    return await this.prisma.note.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(userId: number, noteId: number) {
    return await this.prisma.note.findUnique({
      where: {
        id: noteId,
      },
    });
  }

  async remove(userId: number, noteId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const note = await tx.note.findUnique({
        where: {
          id: noteId,
        },
      });
      if (!note) throw new NotFoundException();
      if (note.userId !== userId) throw new ForbiddenException();

      return await tx.note.delete({
        where: {
          id: noteId,
        },
      });
    });
  }
}
