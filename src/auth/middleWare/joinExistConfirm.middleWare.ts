import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
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

    try {
      if ('socialId' in data) {
        const exist = await this.userService.findBySocialId(data['socialId']);
        const activeToken = this.authService.sign(
          'nickName',
          exist.nickName,
          1,
        );
        const refreshToken = this.authService.sign('id', exist.id, 360);
        if (exist && exist['socialId'] && !exist['password']) {
          return res.json({
            ok: false,
            error:
              '이미 소셜계정으로 가입을 한 적이 있습니다. 비밀번호를 업데이트 하시겠습니까?',
            activeToken,
            refreshToken,
          });
        }

        data['refreshToken'] = refreshToken;
        await this.userService.registerUser(data);

        return res.json({ ok: true, token: activeToken });
      }

      for (let item in data) {
        if (item === 'pwd' || item === 'pwdConfirm') continue;
        const result = await this.authService.confirmExist(item, data, res);
        if (typeof result === 'function') {
          return result();
        }
      }
    } catch (e) {
      console.log(e);
      return res.json(commonMessages.commonFail('인증이'));
    }
    return next();
  }
}
