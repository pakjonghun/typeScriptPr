import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoginDataConfirmMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    if (!('password' in data) || !('email' in data)) {
      return res.json({
        ok: false,
        error: '이메일과 비밀번호를 모두 입력해야 합니다.',
      });
    }
    return next();
  }
}
