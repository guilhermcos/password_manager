import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/custom.decorators';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createNoteDto: CreateNoteDto, @User() userId: number) {
    await this.noteService.create(userId, createNoteDto);
    return 'OK';
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@User() userId: number) {
    return await this.noteService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) noteId: number,
    @User() userId: number,
  ) {
    return await this.noteService.findOne(userId, noteId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id', ParseIntPipe) noteId: number,
    @User() userId: number,
  ) {
    await this.noteService.remove(userId, noteId);
    return 'OK';
  }
}
