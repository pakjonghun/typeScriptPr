import { CoreEntity } from 'src/common/entities/coreEntity';
import { User } from 'src/user/entities/user.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import * as uuid from 'uuid';

@Entity()
export class Auth extends CoreEntity {
  @Column()
  code: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  genCode() {
    this.code = uuid.v4();
  }
}
