import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardRepository } from './card.repository';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async create(userId: number, createCardDto: CreateCardDto) {
    return await this.cardRepository.create(userId, createCardDto);
  }

  async findAll(userId: number) {
    return await this.cardRepository.findAll(userId);
  }

  async findOne(userId: number, cardId: number) {
    return await this.cardRepository.findOne(userId, cardId);
  }
  async remove(userId: number, cardId: number) {
    return await this.cardRepository.remove(userId, cardId);
  }
}
