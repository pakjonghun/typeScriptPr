import {
  IsEAN,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CoreEntity } from 'src/common/entities/coreEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  @Matches(/^[a-z0-9`-=\S]*$/i, {
    message: '닉네임은 형식에 맞는 값을 사용하세요.',
  })
  @Length(3, 15, { message: '닉네임을 3글자 이상 15글자 이하로 입력하세요' })
  nickName: string;

  @Column({ unique: true, nullable: true })
  @IsOptional()
  @IsEmail({}, { message: '이메일 형식을 입력하세요.' })
  email?: string;

  @Column({ nullable: true, select: false })
  @Length(8, 20, { message: '비밀번호는 8~20로 입력하세요' })
  @Matches(/^[\S]*$/g, { message: '비밀번호에 공란은 허용되지 않습니다.' })
  @IsString()
  @IsOptional()
  password?: string;

  @Column({ default: false })
  varified: boolean;

  @Length(8, 20, { message: '비밀번호는 8~20로 입력하세요' })
  @IsString()
  @IsOptional()
  @Matches(/^[\S]*$/g, { message: '비밀번호에 공란은 허용되지 않습니다.' })
  passwordConfirm?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  socialId?: string;
}
