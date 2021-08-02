import { Injectable, NestMiddleware } from '@nestjs/common';
import { exception } from 'console';
import { NextFunction, Request, Response } from 'express';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { commonMessages } from 'src/common/erroeMessages';
import { JoinDTO } from 'src/user/dtos/join.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class userExistConfirmMiddleWare implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const data: JoinDTO = req.body;

    if ('nickName' in data) {
      const samaNickName = await this.userService.findByNickName(data.nickName);
      if (samaNickName) {
        return res.json(commonMessages.commonExist('동일한 닉네임이'));
      }
    }

    if ('email' in data) {
      const exist = await this.userService.findByEmail(data.email);
      if (exist) {
        return res.json(commonMessages.commonExist('가입된 계정이'));
      }
    }

    if ('socialId' in data) {
      const exist = await this.userService.findBySocialId(data['socialId']);
      if (exist && exist['socialId'] && !exist['password']) {
        const token = this.authService.sign(data.nickName);
        return res.json({
          ok: false,
          error:
            '이미 소셜가입을 한 적이 있습니다. 비밀번호를 업데이트 하시겠습니까?',
          token,
        });
      }

      const tokenResult = this.authService.sign(data.nickName);

      if (typeof tokenResult === 'string') {
        try {
          await this.userService.registerUser(data);
        } catch (e) {
          console.log(e);
          return res.json(commonMessages.commonFail('인증이'));
        }

        return res.json({ ok: true, token: tokenResult });
      } else {
        return res.json(tokenResult);
      }
    }
    return next();
  }
}
