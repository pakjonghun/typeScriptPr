import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/entities/auth.entity';
import { commonMessages } from 'src/common/erroeMessages';
import { Not, Repository } from 'typeorm';
import { AuthDTO, AuthOutput } from './dtos/auth.dto';
import { FindPasswordDTO, FindPasswordOutput } from './dtos/findPassword.dto';
import { JoinDTO, JoinOutput } from './dtos/join.dto';
import { LoginDTO } from './dtos/login.dto';
import { UpdateUserDTO, UpdateUserProtoType } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Auth) private readonly auth: Repository<Auth>,
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

  async login({ email, pwd }: LoginDTO) {
    try {
      const userExist = await this.user.findOne(
        { email },
        { select: ['pwd', 'nickName'] },
      );

      if (!userExist) {
        return commonMessages.commonLoginFail;
      }

      if (userExist) {
        const passwordCorrect = await userExist.checkPassword(pwd);
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

  async findPassword({ email }: FindPasswordDTO): Promise<FindPasswordOutput> {
    try {
      const exist = await this.findByCondition({ ['email']: email });
      if (!exist) {
        return commonMessages.commonNotFuond('게정을');
      }
      const newPassword = uuid.v4();
      await this.authService.sendMail(exist.email, newPassword);

      exist.pwd = newPassword;
      await this.user.save(exist);
      return {
        ok: true,
        message:
          '이메일로 변경된 비밀번호가 발송되었습니다. 이메일을 확인하세요.',
      };
    } catch (e) {
      console.log(e);
      return commonMessages.commonAuthFail;
    }
  }

  async updateUser(user: User, data: UpdateUserDTO) {
    console.log(data);
    const isEmailDifferent = 'email' in data && data.email !== user.email;
    try {
      if (isEmailDifferent) {
        const newVerify = await this.authService.makeVerifyCode(User);
        await this.authService.sendMail(data.email, newVerify.code);
      }

      for (let i in data) {
        if (i === 'passwordConfirm') continue;
        user[i] = data[i];
      }

      await this.user.save(user);

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

  async findBySocialId(socialId: string): Promise<User> {
    return this.user.findOne({ socialId });
  }

  async findByNickName(nickName: string): Promise<User> {
    return this.user.findOne(
      { nickName },
      {
        select: [
          'pwd',
          'email',
          'id',
          'nickName',
          'phoneNumber',
          'socialId',
          'varified',
        ],
      },
    );
  }

  async findByEmail(email: string): Promise<User> {
    return this.user.findOne({ email });
  }

  async registerUser(data: JoinDTO): Promise<User> {
    return this.user.save(this.user.create({ ...data }));
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.user.findOne({ phoneNumber });
  }

  async findByCondition(condition: object): Promise<User> {
    return this.user.findOne(condition, {
      select: ['pwd', 'email', 'id'],
    });
  }

  async exceptMeFound(id: number, cretical?: object): Promise<User> {
    return this.user.findOne({ where: { id: Not(id) }, ...cretical });
  }
}
