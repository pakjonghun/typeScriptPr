import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { GetCourseInput, GetCourseOutput } from './dtos/get-course.dto';
import { AreaCode } from './entities/areacode.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Course) private readonly courses: Repository<Course>,
    @InjectRepository(AreaCode)
    private readonly areaCodes: Repository<AreaCode>,
  ) {}

  async getCourse(getCourseInput: GetCourseInput): Promise<GetCourseOutput> {
    const { lat, lng, areaCode, contenttypeid, startDate, category } =
      getCourseInput;

    const data = await this.getWithInKm(
      lat,
      lng,
      200,
      areaCode,
      contenttypeid,
      category,
    );

    // 코스 저장하는 코드

    return { ok: true, data };
  }

  async getWithInKm(lat1, lng1, km, areaCode, contenttypeid, category) {
    const allData = [];

    for (const i of areaCode) {
      const results = await this.courses.find({
        areacode: i,
        contenttypeid,
        cat2: category[1],
      });
      allData.push(...results);
    }

    const result = [];

    for (const i of allData) {
      const { contentid, mapy, mapx, title, overview, cat1, cat2, firstimage } =
        i;
      if (!mapx || !mapy) {
        continue;
      }
      const distance = this.getDistanceFromLatLonInKm(
        lat1,
        lng1,
        Number(mapy),
        Number(mapx),
      );
      if (distance <= km) {
        result.push({
          contentid,
          mapy,
          mapx,
          title,
          overview,
          cat1,
          cat2,
          firstimage,
          distance: Math.round(distance),
        });
      }
    }

    return result;
  }

  getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  // async moveData() {
  //   await axios.get('http://localhost:4000/detail/move').then(async (res) => {
  //     const data = res.data;

  //     for (const obj of data) {
  //       const newObj = this.courses.create({
  //         contentid: obj.contentid,
  //         contenttypeid: obj.contenttypeid,
  //         areacode: obj.areacode,
  //         title: obj.title,
  //         overview: obj.overview,
  //         cat1: obj.cat1,
  //         cat2: obj.cat2,
  //         cat3: obj.cat3,
  //         firstimage: obj.firstimage,
  //         firstimage2: obj.firstimage2,
  //         mapx: obj.mapx,
  //         mapy: obj.mapy,
  //         mlevel: obj.mlevel,
  //         sigungucode: obj.sigungucode,
  //         length: obj.length,
  //         taketime: obj.taketime,
  //       });

  //       await this.areaCodes.save(newObj);
  //     }
  //   });
  // }
}
