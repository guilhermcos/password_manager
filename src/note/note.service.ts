import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}
  async create(userId: number, createNoteDto: CreateNoteDto) {
    return await this.noteRepository.create(userId, createNoteDto);
  }

  async findAll(userId: number) {
    return await this.noteRepository.findAll(userId);
  }

  async findOne(userId: number, noteId: number) {
    const note = await this.noteRepository.findOne(userId, noteId);
    if (!note) throw new NotFoundException();
    if (note.userId !== userId) throw new ForbiddenException();
    return note;
  }

  async remove(userId: number, noteId: number) {
    return await this.noteRepository.remove(userId, noteId);
  }
}
