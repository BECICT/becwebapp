import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Auth]), JwtModule.register({
    secret: jwtConstants.secret}), TypeOrmModule.forFeature([Auth]), CacheModule.register()],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
