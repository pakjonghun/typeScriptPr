import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { runInThisContext } from 'vm';
import { JoinDTO } from './dtos/join.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async join(data: JoinDTO) {}

  async findBySocialId(socialId: string): Promise<User> {
    return this.user.findOne({ socialId });
  }

  async findByNickName(nickName: string): Promise<User> {
    return this.user.findOne({ nickName });
  }

  async findByEmail(email: string): Promise<User> {
    return this.user.findOne({ email });
  }
}
