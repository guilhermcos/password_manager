import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialRepository } from './credential.repository';
import Cryptr from 'cryptr';
import { Credential } from './types/credential.types';

@Injectable()
export class CredentialService {
  private readonly cryptr: Cryptr;
  constructor(private readonly credentialRepository: CredentialRepository) {
    const Cryptr = require('cryptr');
    this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  }

  async create(userId: number, createCredentialDto: CreateCredentialDto) {
    await this.validateCredential(userId, createCredentialDto);
    const encryptedCredential = this.encryptNewCredential(createCredentialDto);
    return await this.credentialRepository.create(userId, encryptedCredential);
  }

  async findAll(userId: number) {
    const credentials = await this.credentialRepository.findAll(userId);
    return this.decryptCredentialsArray(credentials);
  }

  async findByUserId(userId: number, options?: { title: string }) {
    return await this.credentialRepository.findByUserId(userId, options);
  }

  async findOne(userId: number, credentialId: number) {
    const credential = await this.credentialRepository.findOne(credentialId);
    if (!credential) throw new NotFoundException();
    if (credential.userId !== userId) throw new ForbiddenException();
    return credential;
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }

  private encryptNewCredential(createCredentialDto: CreateCredentialDto) {
    const { password } = createCredentialDto;
    createCredentialDto.password = this.cryptr.encrypt(password);
    return createCredentialDto;
  }

  private decryptCredentialsArray(credentials: Credential[]) {
    return credentials.map((credential) => {
      const { password } = credential;
      credential.password = this.cryptr.decrypt(password);
      return credential;
    });
  }

  private async validateCredential(
    userId: number,
    createCredentialDto: CreateCredentialDto,
  ) {
    const userCredentials = await this.findByUserId(userId, {
      title: createCredentialDto.title,
    });
    if (userCredentials.length > 0) {
      throw new ConflictException();
    }
    return true;
  }
}
