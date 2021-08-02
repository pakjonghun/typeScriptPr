import { IsDate, IsNumber, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { Course } from '../entities/course.entity';

export class GetCourseInput {
  @IsDate()
  startDate: Date;

  @IsString()
  category: string[];

  @IsNumber()
  areaCode: number;

  @IsString()
  lat: string;

  @IsString()
  lng: string;

  @IsNumber()
  contenttypeid: number;
}

export class GetCourseOutput extends CommonOutput {
  data?: Course[];
}
