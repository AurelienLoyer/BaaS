import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import usersJson from './../../static/data/users.json';
@Injectable()
export class UsersService {

    users: any[] = usersJson;

    constructor(private readonly jwtService: JwtService) { }

    getAll() {
        return this.users;
    }

    getOne(id) {
        return this.users.filter(user => user.id === id);
    }

    async login({ email, password }) {
        const payload: JwtPayload = { email, password };

        const isValidUser = await this.validateUser(payload);
        console.log('isValidUser', isValidUser);

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

    async validateUser(payload: JwtPayload): Promise<any> {
        return this.users.find(user => user.password === payload.password && user.email === payload.email);
    }
}
