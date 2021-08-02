import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { getUser } from 'src/auth/getUser.decorator';
import { Guard } from 'src/auth/useGuard';
import { AuthDTO, AuthOutput } from './dtos/auth.dto';
import { FindPasswordDTO } from './dtos/findPassword.dto';
import { JoinDTO, JoinOutput } from './dtos/join.dto';
import { LoginDTO } from './dtos/login.dto';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  join(@Body() data: JoinDTO): Promise<JoinOutput> {
    return this.userService.join(data);
  }

  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.userService.login(data);
  }

  @UseGuards(Guard)
  @Post('auth')
  auth(@getUser() user: User, @Body() data: AuthDTO): Promise<AuthOutput> {
    return this.userService.authEmail(user, data);
  }

  @Put('findpassword')
  findPassword(@Body() data: FindPasswordDTO) {
    return this.userService.findPassword(data);
  }

  @UseGuards(Guard)
  @Put('update')
  updateUser(@getUser() user: User, @Body() data: UpdateUserDTO) {
    return this.userService.updateUser(user, data);
  }
}
