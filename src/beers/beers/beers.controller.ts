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

@Controller('beers')
export class BeersController {
  beers: Beer[] = [
    {
      id: 1,
      label: 'Queue de Charrue',
      description:
        'La Queue de Charrue est une famille de bières brassées pour la Brasserie Vanuxeem. La plus connue et typique est la Queue de Charrue brune. Son nom ...',
      image: '/static/img/queuedecharrue.jpg',
      price: 3.7,
      stock: 3,
    },
    {
      id: 2,
      label: 'La Corbeau',
      description:
        'La bière du Corbeau est une bière blonde trés gazeuse et avec une belle mousse persistante.Le nez propose des arômes de citron, de végétal et de caramel.la ...',
      image: '/static/img/corbeau.jpg',
      price: 3.1,
      stock: 1,
    },
    {
      id: 3,
      label: 'Jack Hammer',
      description:
        "Selon la rumeur, la Jack Hammer serait une bière tellement houblonnée que l'on y retrouverait plus d'amertume que le palais humain ne puisse détecter.",
      image: '/static/img/jeackhammer.jpg',
      price: 3.5,
      stock: 5,
    },
    {
      id: 4,
      label: 'Paix Dieu',
      description:
        "Selon la rumeur, la Jack Hammer serait une bière tellement houblonnée que l'on y retrouverait plus d'amertume que le palais humain ne puisse détecter.",
      image: '/static/img/paixdieu.jpg',
      price: 3.5,
      stock: 1,
    },
    {
      id: 5,
      label: 'Rince Cochon',
      description:
        'Autrefois brassée à Annoeullin par la SBA sous le nom de "Le Rince Cochon", cette bière est aujourd\'hui brassée par la brasserie Haacht, en Belgique, qui ...',
      image: '/static/img/rincecochon.jpg',
      price: 3.5,
      stock: 2,
    },
  ];
  constructor() {}

  @Get()
  @ApiOperation({ title: 'Return all beers' })
  findAll(): Beer[] {
    return this.beers;
  }

  @Put()
  @ApiOperation({ title: 'Add a beer to the catalog' })
  create(@Body() beer: Beer): Beer {
    this.beers.push(beer);
    return beer;
  }

  @Get(':id')
  @ApiOperation({ title: 'Return a beer' })
  findOne(@Param('id') id: string): Beer {
    return this.beers.find(beer => beer.id === parseInt(id));
  }

  @Post()
  @ApiOperation({ title: 'Update a beer' })
  update(@Param('id') id: string, @Body() beerToUpdate: Beer): Beer {
    const beerIndex = this.beers.findIndex(
      (beer: Beer) => beer.id === parseInt(id),
    );
    this.beers[beerIndex] = beerToUpdate;
    return beerToUpdate;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ title: 'Delete a Beer' })
  delete(@Param('id') id: string): string {
    this.beers = this.beers.filter(beer => beer.id !== parseInt(id));
    return id;
  }
}
