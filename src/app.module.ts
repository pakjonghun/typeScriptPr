import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jeonghunbag',
      password: 'test',
      database: 'firstrest',
      entities: [UserEntity],
      synchronize: true,
      logging: true,
    }),
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
