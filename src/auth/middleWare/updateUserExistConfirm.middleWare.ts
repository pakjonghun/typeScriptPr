import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { commonMessages } from 'src/common/erroeMessages';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UpdateUserExistConfirmMiddleWare implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if ('nickName' in data) {
      const exist = await this.userService.findByNickName(data['nickName']);
      if (exist) {
        return res.json(commonMessages.commonExist('동일한 닉네임이'));
      }
    }

    if ('email' in data) {
      const exist = await this.userService.findByEmail(data['email']);
      if (exist) {
        return res.json(commonMessages.commonExist('동일한 이메일이'));
      }
    }
    return next();
  }
}
