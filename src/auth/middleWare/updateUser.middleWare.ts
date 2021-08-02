import { Injectable, NestMiddleware } from '@nestjs/common';
import { json, NextFunction, Request, Response } from 'express';
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
      res.json({
        ok: false,
        error: commonMessages.commonWrongData,
      });
    }

    if ('password' in data || 'passwordConfirm' in data) {
      if (!(data['password'] && data['passwordConfirm'])) {
        return res.json({
          ok: false,
          error: '비밀번호와 비밀번호 확인을 모두 입력하세요.',
        });
      }

      if (data['password'] !== data['passwordConfirm']) {
        return res.json({
          ok: false,
          error: '비밀번호가 같지 않습니다.',
        });
      }
    }

    return next();
  }
}
