import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import * as path from 'path';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SmtpService {
  private readonly mailer;

  constructor(private configService: ConfigService) {
    this.mailer = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, data: any) {
    const source = readFileSync(
      path.join(
        __dirname,
        '../../../../src/view/email/reset-password.template.handlebars',
      ),
      'utf8',
    );

    const template = compile(source);
    const html = template(data);

    const mailOptions = {
      from: this.configService.get<string>('SMTP_FROM'),
      to,
      subject,
      html,
    };

    return await this.mailer.sendMail(mailOptions);
  }
}
