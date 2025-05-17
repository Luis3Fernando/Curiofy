import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    JwtModule.register({ secret: process.env.JWT_APPROVAL_SECRET }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'sysaricorp@gmail.com',
          pass: 'czzu hiyr mzan vuvx',
        },
      },
      defaults: {
        from: '"Curiofy" <no-reply@curiofy.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
