import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { commonMessages } from 'src/common/erroeMessages';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import * as sendGridMail from '@sendgrid/mail';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Auth) private readonly auth: Repository<Auth>,
  ) {}

  sign(nickName: string): string | CommonOutput {
    try {
      return jwt.sign({ nickName }, this.configService.get('TOKEN_SECRET'));
    } catch (e) {
      console.log(e);
      return commonMessages.commonFail('인증이');
    }
  }

  verify(token: string): CommonOutput | string | jwt.JwtPayload {
    try {
      return jwt.verify(token, this.configService.get('TOKEN_SECRET'));
    } catch (e) {
      console.log(e);
      return commonMessages.commonFail('인증이');
    }
  }

  makeVerifyCode(user): Promise<Auth> {
    return this.auth.save(this.auth.create({ user }));
  }

  async sendMail(to: string, code: string) {
    const email = {
      from: this.configService.get('MY_EMAIL'),
      to,
      html: '<h1></h1>',
      template_id: 'd-f59c8dcc1fae4ab8925cf0a468ea21d4',

      dynamic_template_data: {
        code,
      },
    };
    sendGridMail.setApiKey(this.configService.get('MAIL_KEY'));
    await sendGridMail.send(email);
  }
}
