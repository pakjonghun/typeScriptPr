import { Injectable, NestMiddleware } from '@nestjs/common';
import { json, NextFunction, Request, Response } from 'express';
import { commonMessages } from 'src/common/erroeMessages';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class UpdateUserExistConfirmMiddleWare implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const user = req['user'];
    if (!user) {
      return res.json(commonMessages.commonAuthFail);
    }

    try {
      const data = req.body;
      for (let item in data) {
        if (item === 'password' || item === 'passwordConfirm') continue;
        const result = await this.userService.exceptMeFound(user.id, {
          [item]: data[item],
        });
        if (result) return res.json(commonMessages.commonExist(item));
      }
    } catch (e) {
      console.log(e);
      return res.json(commonMessages.commonFail('프로파일 변경이'));
    }

    return next();
  }
}
