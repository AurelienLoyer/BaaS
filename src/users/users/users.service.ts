import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  users = [
    {
      id: 1,
      username: 'Aurel',
      email: 'aurelien@loyer.fr',
      password: 'beer',
      cart: {},
    },
    {
      id: 2,
      username: 'Manu',
      email: 'emmanuel@demey.fr',
      password: 'beer',
      cart: {},
    },
  ];
  constructor(private readonly jwtService: JwtService) {}


  async login({ email, password }) {
    const payload: { email: string; password: string } = { email, password };

    const isValidUser = await this.validateUser(payload);

    if (isValidUser) {
      const accessToken = this.jwtService.sign(payload);
      return {
        expiresIn: 3600,
        accessToken: `Bearer ${accessToken}`,
      };
    } else {
      return undefined;
    }
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<boolean> {
    return !!this.users.find(
      user =>
        user.password === payload.password && user.email === payload.email,
    );
  }
}
