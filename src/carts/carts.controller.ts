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
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
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
  @ApiOperation({ title: 'Create a basket for the user' })
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
  @ApiOperation({ title: 'Get the basket of the user' })
  findOne(@User() user): Cart {
    this.logger.log(`Calling GET /api/v1/cart`);
    return user.cart;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Add an array of beerId to the basket of the user' })
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
  @ApiOperation({ title: 'Reset the basket of the user' })
  delete(@User() user): Cart {
    this.logger.log(`Calling DELETE /api/v1/cart`);

    user.cart = {};
    return user.cart;
  }
}
