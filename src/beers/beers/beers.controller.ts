import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  UseGuards,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Beer } from '../beer';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BeersService } from './beers.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Get()
  @ApiOperation({ title: 'Return all beers' })
  findAll(): Beer[] {
    return this.beersService.getBeers();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ title: 'Update a beer' })
  update(@Param('id') id: string, @Body() beerToUpdate: Beer): Beer {
    return this.beersService.updateBeer(parseInt(id), beerToUpdate);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ title: 'Delete a Beer' })
  delete(@Param('id') id: string): number {
    return this.beersService.deleteBeer(parseInt(id));
  }
}
