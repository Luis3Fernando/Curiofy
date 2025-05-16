import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mail.service';

@Module({
  imports: [
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
