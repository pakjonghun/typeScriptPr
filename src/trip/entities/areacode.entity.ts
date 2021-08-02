import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AreaCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  code: number;

  @Column()
  @IsString()
  name: string;
}
