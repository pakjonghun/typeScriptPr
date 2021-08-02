import { CoreEntity } from 'src/common/entities/coreEntity';
import { Location } from 'src/trip/entities/location.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends CoreEntity {
  @Column()
  content: string;

  // @ManyToOne((type) => Location, (location) => location.comment)
  // @JoinColumn()
  // location: Location;

  // @ManyToOne((type) => User, (user) => user.comment)
  // @JoinColumn()
  // user: User;
}
