import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class joinDataConfirmMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    if (!('socialId' in data) && !('email' in data)) {
      return res.json({
        ok: false,
        error: '소셜로그인을 하시거나 회원가입을 해주세요',
      });
    }

    if (!('nickName' in data)) {
      return res.json({ ok: false, error: '닉네임을 입력하세요.' });
    }

    if ('email' in data) {
      if (!('pwd' in data) || !('pwdConfirm' in data)) {
        return res.json({
          ok: false,
          error: '비밀번호나 비밀번호 확인란을 입력하세요',
        });
      }

      if (data.password !== data.passwordConfirm) {
        return res.json({ ok: false, error: '비밀번호가 일치하지 않습니다.' });
      }
    }
    return next();
  }
}
