import { OmitType } from '@nestjs/swagger';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { User } from '../entities/user.entity';

export class JoinDTO extends OmitType(User, [
  'createdAt',
  'id',
  'updatedAt',
  'varified',
]) {}

export class JoinOutput extends CommonOutput {}
