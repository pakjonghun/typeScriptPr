import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: true, unique: true })
  @IsOptional()
  contentid?: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  contenttypeid?: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  areacode?: number;

  @Column({ nullable: true })
  @IsOptional()
  title?: string;

  @Column({ nullable: true })
  @IsOptional()
  overview?: string;

  @Column({ nullable: true })
  @IsOptional()
  cat1?: string;

  @Column({ nullable: true })
  @IsOptional()
  cat2?: string;

  @Column({ nullable: true })
  @IsOptional()
  cat3?: string;

  @Column({ nullable: true })
  @IsOptional()
  firstimage?: string;

  @Column({ nullable: true })
  @IsOptional()
  firstimage2?: string;

  @Column({ nullable: true })
  @IsOptional()
  mapx?: string;

  @Column({ nullable: true })
  @IsOptional()
  mapy?: string;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  mlevel?: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  sigungucode?: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  length?: string;

  @Column({ nullable: true })
  @IsOptional()
  taketime?: string;
}
