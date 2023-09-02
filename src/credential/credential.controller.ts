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
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../decorators/custom.decorators';

@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() userId: number,
  ) {
    await this.credentialService.create(userId, createCredentialDto);
    return 'OK';
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@User() userId: number) {
    return await this.credentialService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) credentialId: number,
    @User() userId: number,
  ) {
    return await this.credentialService.findOne(userId, credentialId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCredentialDto: UpdateCredentialDto,
  ) {
    return this.credentialService.update(+id, updateCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialService.remove(+id);
  }
}
