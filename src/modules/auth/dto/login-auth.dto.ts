import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Correo electronico',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
