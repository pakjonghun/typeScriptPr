import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { GetCourseInput, GetCourseOutput } from './dtos/get-course.dto';
import { AreaCode } from './entities/areacode.entity';
import { Course } from './entities/course.entity';
import { Location } from './entities/location.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Course) private readonly courses: Repository<Course>,
    @InjectRepository(AreaCode)
    private readonly areaCodes: Repository<AreaCode>,
    @InjectRepository(Location)
    private readonly locations: Repository<Location>,
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
        cat2: category ? category[1] : ' ',
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

  async moveData() {
    await axios.get('http://localhost:4000/detail/move').then(async (res) => {
      const data = res.data;

      for (const obj of data) {
        for (const loketsi of obj.course) {
          console.log(loketsi);
          const newLoketsi = this.locations.create({
            contentid: loketsi.contentid,
            subcontentid: loketsi.subcontentid,
            contenttypeid: loketsi.contenttypeid,
            name: loketsi.subname,
            overview: loketsi.subdetailoverview,
            img: loketsi.subdetailimg,
          });

          await this.locations.save(newLoketsi);
        }

        const newObj = this.courses.create({
          contentid: obj.commonDetail[0].contentid,
          contenttypeid: obj.commonDetail[0].contenttypeid,
          areacode: obj.commonDetail[0].areacode,
          title: obj.commonDetail[0].title,
          overview: obj.commonDetail[0].overview,
          cat1: obj.commonDetail[0].cat1,
          cat2: obj.commonDetail[0].cat2,
          cat3: obj.commonDetail[0].cat3,
          firstimage: obj.commonDetail[0].firstimage,
          firstimage2: obj.commonDetail[0].firstimage2,
          mapx: obj.commonDetail[0].mapx + '',
          mapy: obj.commonDetail[0].mapy + '',
          mlevel: obj.commonDetail[0].mlevel,
          sigungucode: obj.commonDetail[0].sigungucode,
          length: obj.introduceDetail[0].length,
          taketime: obj.introduceDetail[0].taketime,
        });

        console.log(newObj);
        await this.courses.save(newObj);
      }
    });
  }
}
