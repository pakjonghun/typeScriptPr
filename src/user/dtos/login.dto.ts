import { PickType } from '@nestjs/swagger';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { User } from '../entities/user.entity';

export class LoginDTO extends PickType(User, [
  'email',
  'password',
  'socialId',
]) {}

export class LoginOutput extends CommonOutput {
  token?: string;
}
