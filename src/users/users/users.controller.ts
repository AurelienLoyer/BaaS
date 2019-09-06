import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { UsersService } from './users.service';

class User {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ title: 'Login a user' })
  async login(@Body() userDto: User): Promise<any> {
    const userToken = await this.usersService.login(userDto);
    if (userToken === undefined) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    return userToken;
  }
}
