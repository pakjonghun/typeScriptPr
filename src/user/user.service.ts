import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/entities/auth.entity';
import { commonMessages } from 'src/common/erroeMessages';
import { Code, Repository } from 'typeorm';
import { AuthDTO, AuthOutput } from './dtos/auth.dto';
import { FindPasswordDTO } from './dtos/findPassword.dto';
import { JoinDTO, JoinOutput } from './dtos/join.dto';
import { LoginDTO } from './dtos/login.dto';
import { UpdateUserDTO, UpdateUserProtoType } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Auth) private readonly auth: Repository<Auth>,
    private readonly authService: AuthService,
  ) {}

  async join(data: JoinDTO): Promise<JoinOutput> {
    try {
      const newUser = await this.registerUser(data);
      if (newUser.email) {
        const verify = await this.authService.makeVerifyCode(newUser);
        await this.authService.sendMail(newUser.email, verify.code);
      }
      return {
        ok: true,
        ...(data.email && {
          message: '가입하신 이메일로 인증번호가 발송되었습니다.',
        }),
      };
    } catch (e) {
      console.log(e);
      return commonMessages.commonFail('회원가입이');
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      const userExist = await this.user.findOne(
        { email },
        { select: ['password', 'nickName'] },
      );

      if (!userExist) {
        return commonMessages.commonLoginFail;
      }

      if (userExist) {
        const passwordCorrect = await userExist.checkPassword(password);
        if (!passwordCorrect) {
          return commonMessages.commonLoginFail;
        }

        if (passwordCorrect) {
          const token = this.authService.sign(userExist.nickName);
          return {
            ok: true,
            token,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return commonMessages.commonFail('로그인이');
    }
  }

  async authEmail(loginUser: User, { code }: AuthDTO): Promise<AuthOutput> {
    try {
      const exist = await this.auth.findOne(
        { user: loginUser, code },
        { select: ['id'] },
      );

      if (!exist) {
        return commonMessages.commonAuthFail;
      }

      if (exist) {
        await this.auth.delete(exist.id);
        await this.user.save({ id: loginUser.id, verified: true });
      }
      return commonMessages.commonSuccess;
    } catch (e) {
      console.log(e);
      return commonMessages.commonFail('이메일 인증이');
    }
  }

  async findPassword({ email }: FindPasswordDTO) {
    try {
      const exist = await this.findByEmail(email);
      if (!exist) {
        return commonMessages.commonNotFuond('게정을');
      }
    } catch (e) {
      console.log(e);
      return commonMessages.commonAuthFail;
    }
  }

  async updateUser(user: User, data: UpdateUserDTO) {
    const isEmailDifferent = 'email' in data && data.email !== user.email;
    try {
      if (isEmailDifferent) {
        const newVerify = await this.authService.makeVerifyCode(User);
        await this.authService.sendMail(data.email, newVerify.code);
      }
      await this.updateUserPropType({ id: user.id, ...data });
      return {
        ok: true,
        ...(isEmailDifferent && {
          message: '변경된 이메일로 인증번호가 발송되었습니다.',
        }),
      };
    } catch (e) {
      console.log(e);
      return commonMessages.commonFail('사용자 정보 업데이트가');
    }
  }

  async updateUserPropType(data: UpdateUserProtoType): Promise<User> {
    return this.user.save({ ...data });
  }

  async findBySocialId(socialId: string): Promise<User> {
    return this.user.findOne({ socialId });
  }

  async findByNickName(nickName: string): Promise<User> {
    return this.user.findOne({ nickName });
  }

  async findByEmail(email: string): Promise<User> {
    return this.user.findOne({ email });
  }

  async registerUser(data: JoinDTO): Promise<User> {
    return this.user.save(this.user.create({ ...data }));
  }
}
