import { CommonOutput } from 'src/common/dtos/common.dto';
import { Location } from '../entities/location.entity';

export class GetCourseProcessOutput extends CommonOutput {
  courseProcess: Location[];
}
