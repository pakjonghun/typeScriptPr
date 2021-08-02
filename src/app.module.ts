import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { TripSupportModule } from './trip-support/trip-support.module';
import * as Joi from 'joi';
import { User } from './user/entities/user.entity';
import { TripRecord } from './user/entities/tripRecord.entity';
import { Comment } from './trip-support/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { TripModule } from './trip/trip.module';
import { Location } from './trip/entities/location.entity';
import { Course } from './trip/entities/course.entity';
import { AreaCode } from './trip/entities/areacode.entity';
import { userExistConfirmMiddleWare } from './auth/middleWare/userExist.confirm.middlewar';
import { joinDataConfirmMiddleWare } from './auth/middleWare/joinDataConfirm.middleWare';
import { LoginDataConfirmMiddleWare } from './auth/middleWare/loginDataConfirm.middleWare';
import { TokenMiddleWare } from './auth/middleWare/token.middleWare';
import { UpdateUserDataConfirmMiddleWare } from './auth/middleWare/updateUser.middleWare';
import { UpdateUserExistConfirmMiddleWare } from './auth/middleWare/updateUserExistConfirm.middleWare';

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
        TOKEN_SECRET: Joi.string().required(),
        MY_EMAIL: Joi.string().required(),
        MAIL_KEY: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, TripRecord, Comment, Auth, Location, Course, AreaCode],
      synchronize: true,
      logging: true,
    }),

    CommonModule,

    UserModule,

    AuthModule,

    TripModule,

    TripSupportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(joinDataConfirmMiddleWare, userExistConfirmMiddleWare)
      .forRoutes({ path: 'user/join', method: RequestMethod.POST });

    consumer
      .apply(LoginDataConfirmMiddleWare)
      .forRoutes({ path: 'user/login', method: RequestMethod.POST });

    consumer
      .apply(TokenMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(UpdateUserDataConfirmMiddleWare, UpdateUserExistConfirmMiddleWare)
      .forRoutes({ path: 'user/update', method: RequestMethod.ALL });
  }
}
