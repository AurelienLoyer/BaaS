import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Beer } from '../beer';
import { ApiOperation } from '@nestjs/swagger';
import { BeersService } from './beers.service';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  @ApiOperation({ title: 'Return all beers' })
  findAll(): Beer[] {
    return this.beersService.getBeers();
  }

  @Put()
  @ApiOperation({ title: 'Add a beer to the catalog' })
  create(@Body() beer: Beer): Beer {
    return this.beersService.addBeer(beer);
  }

  @Get(':id')
  @ApiOperation({ title: 'Return a beer' })
  findOne(@Param('id') id: string): Beer {
    return this.beersService.getBeerById(parseInt(id));
  }

  @Post()
  @ApiOperation({ title: 'Update a beer' })
  update(@Param('id') id: string, @Body() beerToUpdate: Beer): Beer {
    return this.beersService.updateBeer(parseInt(id), beerToUpdate);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ title: 'Delete a Beer' })
  delete(@Param('id') id: string): number {
    return this.beersService.deleteBeer(parseInt(id));
  }
}
