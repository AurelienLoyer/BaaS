import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import usersJson from './../../static/data/users.json';
import { UserDto } from './user.dto';
import { User } from './interfaces/user.interface';
@Injectable()
export class UsersService {
  users: User[] = usersJson;

  constructor(private readonly jwtService: JwtService) {}

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User {
    return this.users.find(user => user.id === id);
  }

  async login({ email, password }) {
    const payload: JwtPayload = { email, password };

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

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.users.find(
      user =>
        user.password === payload.password && user.email === payload.email,
    );
  }
}
