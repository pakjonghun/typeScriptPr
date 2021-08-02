import { CoreEntity } from 'src/common/entities/coreEntity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as uuid from 'uuid';

@Entity()
export class Auth extends CoreEntity {
  @Column()
  code: string;

  @BeforeInsert()
  genCode() {
    this.code = uuid.v4();
  }
}
