import { IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';

export class AuthDTO {
  @IsString({ message: '형식에 맞는 값을 입력하세요.' })
  code: string;
}

export class AuthOutput extends CommonOutput {}
