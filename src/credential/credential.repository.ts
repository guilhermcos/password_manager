import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Credential } from './types/credential.types';

@Injectable()
export class CredentialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createCredentialDto: CreateCredentialDto) {
    return await this.prisma.credential.create({
      data: { userId, ...createCredentialDto },
    });
  }

  async findAll(userId: number): Promise<Credential[]> {
    return await this.prisma.credential.findMany({
      where: {
        userId,
      },
    });
  }

  async findByUserId(userId: number, options: { title?: string }) {
    const { title } = options;
    return await this.prisma.credential.findMany({
      where: {
        userId,
        title,
      },
    });
  }

  async findOne(credentialId) {
    return await this.prisma.credential.findUnique({
      where: {
        id: credentialId,
      },
    });
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
