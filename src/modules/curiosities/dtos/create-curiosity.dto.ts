import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
