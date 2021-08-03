import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/trip/entities/course.entity';
import { GeoService } from './geo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [GeoService],
  exports: [GeoService],
})
export class GeoModule {}
