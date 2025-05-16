import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(email: string, token: string) {
    const url = `http://localhost:3000/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verifica tu cuenta',
      html: `<p>Haz clic aquí para verificar tu cuenta:</p><a href="${url}">${url}</a>`,
    });
  }
}
