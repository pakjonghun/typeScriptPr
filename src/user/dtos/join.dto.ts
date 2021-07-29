import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class JoinUserDto extends OmitType(UserEntity, [
  'id',
  'createdAt',
  'updateedAt',
]) {}
