import { Body, Controller, Post } from '@nestjs/common';
import { JoinDTO } from './dtos/join.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/join')
  join(@Body() data: JoinDTO) {
    return this.userService.join(data);
  }
}
