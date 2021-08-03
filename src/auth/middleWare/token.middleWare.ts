import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { commonMessages } from 'src/common/erroeMessages';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenMiddleWare implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const tokenArray = req.headers.authorization.split(' ');
      if (tokenArray[0] !== 'Bearer') {
        return res.json(commonMessages.commonAuthFail);
      }

      const tokenPayload = this.authService.verify(tokenArray[1]);

      if (typeof tokenPayload === 'object' && 'nickName' in tokenPayload) {
        const user = await this.userService.findByNickName(
          tokenPayload['nickName'],
        );

        req['user'] = user;
      }
    }
    return next();
  }
}
