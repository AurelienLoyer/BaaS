import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './user.dto';
import { User } from '../decorators/user';

@Controller('api/v1/users')
@ApiUseTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @ApiOperation({ title: 'Return all users' })
  findAll(): any[] {
    this.logger.log(`Calling GET /api/v1/users`);
    return this.usersService.getAll();
  }

  @Post('login')
  @ApiOperation({ title: 'Login a user' })
  async login(@Body() userDto: UserDto): Promise<any> {
    this.logger.log(`Calling POST /api/v1/users/login`);

    const userToken = await this.usersService.login(userDto);
    if (userToken === undefined) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    return userToken;
  }

  @Get('info')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Return the info of the user' })
  getUserInfo(@User() user) {
    this.logger.log(`Calling GET /api/v1/info`);

    return {
      ...user,
      password: '******',
    };
  }
}
