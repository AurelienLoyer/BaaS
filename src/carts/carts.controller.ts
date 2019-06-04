import { Controller, Delete, Get, Put, Post, Param, ParseIntPipe, UseGuards, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';
import { AuthGuard } from '@nestjs/passport';
import { BeersService } from './../beers/beers.service';

@Controller('api/v1/cart')
@ApiUseTags('cart')
export class CartsController {

    constructor(public beersService: BeersService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Put()
    create(@Req() req) {

        const newCart: Cart = {
            id: req.user.id,
            creationDate: new Date(),
            beers: [],
        }

        req.user.cart = newCart;

        return req.user.cart;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findOne(@Req() req): Cart {
        return req.user.cart;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post()
    update(@Req() req, @Body() beers: Number[]) {

        if(!req.user.cart.beers) {
            throw new HttpException(`Cart not found, first create an empty cart 🛒 (PUT)`, HttpStatus.NOT_FOUND);
        }

        beers.forEach(beerId => {
            if (this.beersService.isStockAvailable(beerId)) {
                if (this.beersService.decreaseStock(beerId)) {
                    req.user.cart.beers.push(beerId);
                } else {
                    throw new HttpException(`Beer not found`, HttpStatus.NOT_FOUND);
                }
            } else {
                throw new HttpException(`Beer id ${beerId} not available 😅`, HttpStatus.NOT_FOUND);
            }
        });
        return req.user.cart;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete()
    delete(@Req() req): string {
        req.user.cart = {};
        return req.user.cart;
    }
}
