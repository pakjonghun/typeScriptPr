import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { commonMessages } from 'src/common/erroeMessages';
import { JoinDTO } from 'src/user/dtos/join.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class userExistConfirmMiddleWare implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const data: JoinDTO = req.body;

    if ('socialId' in data) {
      const exist = await this.userService.findBySocialId(data.socialId);
      if (exist) {
        return res.json(commonMessages.commonExist('가입된 게정이'));
      }
      return next();
    }

    if ('email' in data) {
      const exist = await this.userService.findByEmail(data.email);
      if (exist) {
        return res.json(commonMessages.commonExist('가입된 계정이'));
      }
    }

    const exist = await this.userService.findByNickName(data.nickName);
    if (exist) {
      return res.json(commonMessages.commonExist('동일한 닉네임이'));
    }

    return next();
  }
}
