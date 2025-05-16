import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com', // o smtp.mailtrap.io, etc.
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
  template: {
    dir: __dirname + '/../templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
