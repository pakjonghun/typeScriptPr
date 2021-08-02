import { Body, Controller, Get } from '@nestjs/common';
import { GetCourseInput, GetCourseOutput } from './dtos/get-course.dto';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('search')
  getCourse(@Body() getCourseInput: GetCourseInput): Promise<GetCourseOutput> {
    return this.tripService.getCourse(getCourseInput);
  }

  //   @Get('move')
  //   moveData() {
  //     return this.tripService.moveData();
  //   }
}
