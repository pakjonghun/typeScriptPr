import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Auth]), forwardRef(() => UserModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
