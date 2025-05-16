import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from '@prisma/client';
import { User } from '@prisma/client';
import type { Topic } from '@prisma/client';
import { Image } from '@prisma/client';

export class CreateCuriosityDto {
  @IsString()
  @ApiProperty({ example: 'How to use NestJS with Prisma?' })
  title: string;

  @IsString()
  content: string;

  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;
}

export class ResponseCuriosityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isApproved: boolean;

  @ApiProperty()
  user: User;

  @ApiProperty()
  category: Category;

  @ApiProperty({ type: [Image] })
  images: Image[];

  @ApiProperty({ type: () => [Object] })
  curiosityTopics: Topic[];
}
