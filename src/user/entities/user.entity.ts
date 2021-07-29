import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class UserEntity extends CoreEntity {
  @Column({ default: null })
  @IsOptional()
  @IsString()
  socialId?: string;

  @Column({ default: null })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Column({ default: null })
  @IsOptional()
  @Length(4, 10)
  @IsString()
  password?: string;

  @Column({ default: null })
  @IsOptional()
  @IsString()
  nickName?: string;

  @BeforeInsert()
  async hashPassword() {
    try {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
