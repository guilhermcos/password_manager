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
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { User } from '../decorators/custom.decorators';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createCardDto: CreateCardDto, @User() userId: number) {
    await this.cardService.create(userId, createCardDto);
    return 'OK';
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@User() userId: number) {
    return await this.cardService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) cardId: number,
    @User() userId: number,
  ) {
    return await this.cardService.findOne(userId, cardId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id', ParseIntPipe) cardId: number,
    @User() userId: number,
  ) {
    await this.cardService.remove(userId, cardId);
    return 'OK';
  }
}
