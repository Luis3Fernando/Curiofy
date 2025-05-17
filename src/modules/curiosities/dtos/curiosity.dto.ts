import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCuriosityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Titulo de la curiosidad' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Contenido extenso de la curiosidad, extensa o breve',
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Animales' })
  categoryName: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: 'Un array de topics(tags)',
    example: "['Naturaleza', 'Animales Marinos']",
  })
  topicNames?: string[];
}

export class UpdateCuriosityDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Titulo de la curiosidad, opcional' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Contenido extenso de la curiosidad, opcional',
  })
  content?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Nombre de la categoría, opcional' })
  categoryName?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Un array de topics(tags), opcional',
  })
  @IsString({ each: true })
  topicNames?: string[];
}
