import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinDTO } from './dtos/join.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly User: User) {}

  async join(data: JoinDTO) {
    console.log(data);
  }
}
