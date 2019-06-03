import { Controller, Get, UseGuards, Post, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './user.dto';

@Controller('api/v1/users')
@ApiUseTags('users')
export class UsersController {

    constructor(public usersService: UsersService) { }

    @Get()
    findAll(): any[] {
        return this.usersService.getAll();
    }

    @Post('login')
    async login(@Body() userDto: UserDto): Promise<any> {
        const userToken = await this.usersService.login(userDto);
        if (userToken === undefined) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        }
        return userToken;
    }

    @Get('info')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    getUserInfo(@Req() req) {
        return {
            ...req.user,
            password: '******',
        }
    }
}
