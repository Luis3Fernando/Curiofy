import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@modules/mail/mail.module';

@Module({
  imports: [PrismaModule, JwtModule, MailModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
