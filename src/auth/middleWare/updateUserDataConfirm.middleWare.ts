import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { commonMessages } from 'src/common/erroeMessages';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UpdateUserDataConfirmMiddleWare implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    let count = 0;
    for (let i in data) {
      count += String(data[i].trim()).length;
    }
    if (!count) {
      return res.json({
        ok: false,
        error: commonMessages.commonWrongData,
      });
    }

    if ('pwd' in data || 'pwdConfirm' in data) {
      if (!(data['pwd'] && data['pwdConfirm'])) {
        return res.json({
          ok: false,
          error: '비밀번호와 비밀번호 확인을 모두 입력하세요.',
        });
      }

      if (data['pwd'] !== data['pwdConfirm']) {
        return res.json({
          ok: false,
          error: '비밀번호가 같지 않습니다.',
        });
      }
    }

    return next();
  }
}
