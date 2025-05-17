import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generateApprovalToken(curiosityId: string, adminEmail: string) {
    return this.jwtService.sign(
      { curiosityId, adminEmail },
      {
        secret: this.configService.get('JWT_APPROVAL_SECRET'),
        expiresIn: '1d',
      },
    );
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `http://localhost:3000/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verifica tu cuenta',
      html: `<p>Haz clic aquí para verificar tu cuenta:</p><a href="${url}">${url}</a>`,
    });
  }

  async sendApprovalRequestEmail(
    adminEmail: string,
    curiosity: {
      id: string;
      title: string;
      content: string;
      category: string;
      topics: string[];
    },
  ) {
    const token = this.generateApprovalToken(curiosity.id, adminEmail);
    const approveUrl = `http://localhost:3000/curiosities/approve?token=${token}`;

    await this.mailerService.sendMail({
      to: adminEmail,
      subject: 'Nueva curiosidad pendiente de aprobación',
      html: `
      <h3>Nueva curiosidad creada</h3>
      <p><strong>Título:</strong> ${curiosity.title}</p>
      <p><strong>Descripción:</strong> ${curiosity.content}</p>
      <p><strong>Categoría:</strong> ${curiosity.category}</p>
      <p><strong>Temas:</strong> ${curiosity.topics.join(', ')}</p>
      <p>Para aprobar esta curiosidad, haz clic en el siguiente enlace:</p>
      <a href="${approveUrl}">${approveUrl}</a>
    `,
    });
  }

  async sendUserApprovalNotification(email: string, title: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Tu curiosidad fue aprobada 🎉',
      html: `<p>¡Felicidades! Tu curiosidad titulada <strong>"${title}"</strong> fue aprobada y ahora es visible para todos.</p>`,
    });
  }
}
