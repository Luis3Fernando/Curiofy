import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCuriosityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'How to use NestJS with Prisma?' })
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  topicNames?: string[];
}

export class UpdateCuriosityDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  topicNames?: string[];
}
