import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { TripModule } from './trip/trip.module';
import { TripSupportModule } from './trip-support/trip-support.module';
import * as Joi from 'joi';
import { User } from './user/entities/user.entity';
import { TripRecord } from './user/entities/tripRecord.entity';
import { Comment } from './trip-support/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, TripRecord, Comment, Auth],
      synchronize: true,
      logging: true,
    }),

    CommonModule,

    UserModule,

    TripModule,

    TripSupportModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
