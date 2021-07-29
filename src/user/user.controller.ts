import { Body, Controller, Post } from '@nestjs/common';
import {
  commonInputOutput,
  CommonOutput,
} from 'src/common/entities/common.dto';
import { JoinUserDto } from './dtos/join.dto';
import { LoginDto } from './dtos/login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/join')
  async join(@Body() data: JoinUserDto): Promise<CommonOutput> {
    return this.userService.joinUser(data);
  }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    //email 과 password 가 있거나 social id가 있어야 한다.
    if (!(('email' in data && 'password' in data) || 'socialId' in data)) {
    }
  }
}
