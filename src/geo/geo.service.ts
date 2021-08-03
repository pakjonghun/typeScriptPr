import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/trip/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Course) private readonly courses: Repository<Course>,
  ) {}

  async getWithInKm(lat1, lng1, km, areaCode, contenttypeid, category) {
    const allData = await this.courses
      .createQueryBuilder()
      .where('areacode IN (:...areaCode)', { areaCode })
      .andWhere('contenttypeid = :contenttypeid', { contenttypeid })
      .andWhere('cat2 IN (:...category)', { category })
      .getMany();

    const result = [];

    for (const i of allData) {
      if (!i.mapx || !i.mapy) {
        continue;
      }
      const distance = this.getDistanceFromLatLonInKm(
        lat1,
        lng1,
        Number(i.mapy),
        Number(i.mapx),
      );
      if (distance <= km) {
        result.push({ ...i, distance: Math.round(distance) });
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
}
