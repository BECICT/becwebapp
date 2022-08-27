import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/constants';
import { AuthService } from './auth.service';
import { use } from 'passport';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //return payload;
    const { email } = payload;
    const user = await this.authService.findOneByPhoneno(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    await this.cacheManager.set('signedInUser', user.fullname, {ttl: 360})
    return user;
  }
}