import { CardType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CardType)
  type: CardType;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  securityCode: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  expiresIn: string;
}
