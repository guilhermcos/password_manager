import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';
const dayjs = require('dayjs');

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createCardDto: CreateCardDto) {
    return await this.prisma.card.create({
      data: {
        ...createCardDto,
        userId,
        expiresIn: dayjs(createCardDto.expiresIn).format(),
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.card.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(userId: number, cardId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const card = await tx.card.findUnique({
        where: {
          id: cardId,
        },
      });
      if (!card) throw new NotFoundException();
      if (card.userId !== userId) throw new ForbiddenException();

      return card;
    });
  }

  async remove(userId: number, cardId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const card = await tx.card.findUnique({
        where: {
          id: cardId,
        },
      });
      if (!card) throw new NotFoundException();
      if (card.userId !== userId) throw new ForbiddenException();

      const deleted = await tx.card.delete({
        where: {
          id: cardId,
        },
      });
    });
  }
}
