import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  commonErrorOutput,
  commonInputOutput,
  CommonOutput,
} from 'src/common/entities/common.dto';
import { Repository } from 'typeorm';
import { JoinUserDto } from './dtos/join.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async joinUser(data: JoinUserDto): Promise<CommonOutput> {
    if (
      !(
        ('email' in data && 'password' in data && 'nickName' in data) ||
        'socialId' in data
      )
    ) {
      return commonInputOutput;
    }

    try {
      const exist = await this.userEntity.findOne({ email: data.email });
      if (exist) {
        return {
          ok: false,
          error: '동일한 계정이 존재합니다.',
        };
      }

      await this.userEntity.save(await this.userEntity.create({ ...data }));
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return commonErrorOutput;
    }
  }
}
