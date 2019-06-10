import { Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe, Put, Delete, Post, Body, HttpCode } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Beer } from './entities/beer.entity';
import { BeersService } from './beers.service';
import { BeerDto } from './beer.dto';

@Controller('api/v1/beers')
@ApiUseTags('beers')
export class BeersController {
    constructor(private readonly beersService: BeersService) { }

    @Get()
    findAll(): any[] {
        return this.beersService.findAll();
    }

    @Put()
    create(@Body() beer: BeerDto) {
        if (this.beersService.beers.length > 5) {
            throw new HttpException(
                `Too much beers added !`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        this.beersService.add(beer);
        return beer;
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Beer {
        const beer: Beer = this.beersService.findOneById(id);
        if (beer === undefined) {
            throw new HttpException(
                `Cannot find a beer 🍺 with id ${id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return beer;
    }

    @Post()
    update(@Body() beer: BeerDto) {
        let findBeer: Beer = this.beersService.findOneById(beer.id);
        if (findBeer === undefined) {
            throw new HttpException(
                `Cannot find a beer 🍺 with id ${beer.id}`,
                HttpStatus.NOT_FOUND,
            );
        }
        return this.beersService.update(beer);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', new ParseIntPipe()) id: number) {
        return 'OK';
    }
}
