import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AreaCode } from './entities/areacode.entity';
import { Location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, AreaCode, Location])],
  providers: [TripService],
  controllers: [TripController],
})
export class TripModule {}
