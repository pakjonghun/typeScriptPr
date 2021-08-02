import { IsEmail, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class FindPasswordDTO {
  @IsString({ message: '형식을 지켜주세요.' })
  @IsEmail({}, { message: '이메일 형식이어야 합니다.' })
  email: string;
}

export class FindPasswordOutput extends CommonOutput {}
