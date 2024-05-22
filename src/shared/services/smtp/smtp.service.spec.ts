import { Test, TestingModule } from '@nestjs/testing';
import { SmtpService } from './smtp.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

describe('SmtpService', () => {
  let service: SmtpService;
  let configService: ConfigService;
  let nodemailerTransport;

  beforeEach(async () => {
    nodemailerTransport = jest
      .spyOn(nodemailer, 'createTransport')
      .mockReturnValue({
        sendMail: jest.fn(),
      });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmtpService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => key),
          },
        },
      ],
    }).compile();

    service = module.get<SmtpService>(SmtpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send email', async () => {
      const result = await service.sendEmail('test@gmail.com', 'teste', {
        message: 'Hello',
      });

      expect(result).toBeUndefined();
      expect(nodemailerTransport.sendMail).toBeCalled();
    });
  });
});
