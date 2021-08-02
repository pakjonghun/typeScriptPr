import { PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/coreEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location extends PickType(CoreEntity, ['id']) {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  contentid: number;

  @Column()
  @IsNumber()
  subcontentid: number;

  @Column()
  @IsNumber()
  contenttypeid: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  overview: string;

  @Column()
  @IsString()
  img: string;
}
