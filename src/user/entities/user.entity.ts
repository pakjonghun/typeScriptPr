import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/coreEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  nickName: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: false })
  varified: boolean;

  @Column({ nullable: true })
  socialId?: string;
}
