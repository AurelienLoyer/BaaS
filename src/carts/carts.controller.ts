import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';
import { AuthGuard } from '@nestjs/passport';
import { BeersService } from './../beers/beers.service';
import { User } from '../decorators/user';

@Controller('api/v1/cart')
@ApiUseTags('cart')
export class CartsController {
  constructor(
    private readonly beersService: BeersService,
    private readonly logger: Logger,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  create(@User() user): Cart {
    this.logger.log(`Calling PUT /api/v1/cart`);

    const newCart: Cart = {
      id: user.id,
      creationDate: new Date(),
      beers: [],
    };

    user.cart = newCart;

    return user.cart;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOne(@User() user): Cart {
    this.logger.log(`Calling GET /api/v1/cart`);
    return user.cart;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  update(@User() user, @Body() beers: number[]): Cart {
    this.logger.log(`Calling POST /api/v1/cart`);
    if (!user.cart.beers) {
      throw new HttpException(
        `Cart not found, first create an empty cart 🛒 (PUT)`,
        HttpStatus.NOT_FOUND,
      );
    }

    beers.forEach(beerId => {
      if (this.beersService.isStockAvailable(beerId)) {
        if (this.beersService.decreaseStock(beerId)) {
          user.cart.beers.push(beerId);
        } else {
          throw new HttpException(`Beer not found`, HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException(
          `Beer id ${beerId} not available 😅`,
          HttpStatus.NOT_FOUND,
        );
      }
    });
    return user.cart;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  delete(@User() user): Cart {
    this.logger.log(`Calling DELETE /api/v1/cart`);

    user.cart = {};
    return user.cart;
  }
}
