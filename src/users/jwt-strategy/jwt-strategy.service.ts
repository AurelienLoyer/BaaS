import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretBeer',
    });
  }

  async validate(payload: { email: string, password: string}) {
    const user = await this.usersService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException('The user is unauthorized');
    }
    return user;
  }
}