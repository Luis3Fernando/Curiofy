import { IsString } from 'class-validator';

export class CreateLogDto {
  @IsString()
  userId: string;

  @IsString()
  action: string;

  @IsString()
  target: string;
}
