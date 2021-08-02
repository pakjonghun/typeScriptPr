import { CoreEntity } from 'src/common/entities/coreEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class TripRecord extends CoreEntity {
  @Column()
  tripDate: Date;

  @Column({ nullable: true })
  comment?: string;

  @Column({ default: false })
  goOrnot: boolean;
}
