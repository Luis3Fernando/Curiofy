import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from './services/mail.service';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [AuthService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
