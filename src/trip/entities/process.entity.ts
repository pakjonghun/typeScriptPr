import { PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/coreEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Process extends PickType(CoreEntity, ['id']) {
  @Column()
  @IsNumber()
  location_1: number;

  @Column()
  @IsNumber()
  location_2: number;

  @Column()
  @IsNumber()
  location_3: number;

  @Column()
  @IsNumber()
  location_4: number;

  @Column()
  @IsNumber()
  location_5: number;
}
