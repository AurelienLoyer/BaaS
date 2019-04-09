import { Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Beer } from './entities/beer.entity';
import { BeersService } from './beers.service';

@Controller('api/v1/beers')
@ApiUseTags('beers')
export class BeersController {

    constructor(public beersService : BeersService) { }

    @Get()
    findAll(): any[] {
        return this.beersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Beer {
        const beer: Beer = this.beersService.findOneById(id);
        if (beer === undefined) {
            throw new HttpException(`Cannot find a beer 🍺 with id ${id}`, HttpStatus.NOT_FOUND);
        }
        return beer;
    }
}

