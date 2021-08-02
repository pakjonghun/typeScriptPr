import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
