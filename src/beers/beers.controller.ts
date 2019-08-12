import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Put,
  Delete,
  Post,
  Body,
  HttpCode,
  Logger,
  UseFilters,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Beer } from './entities/beer.entity';
import { BeersService } from './beers.service';
import { BeerDto } from './beer.dto';
import { BeerUnavailableException } from './beers.exception';
import { BeerExceptionFilter } from './beers.exception.filter';

@Controller('api/v1/beers')
@ApiUseTags('beers')
@UseFilters(BeerExceptionFilter)
export class BeersController {
  constructor(
    private readonly beersService: BeersService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @ApiOperation({ title: 'Return all beers' })
  findAll(): any[] {
    this.logger.log(`Calling GET /api/v1/beers`);

    return this.beersService.findAll();
  }

  @Put()
  @ApiOperation({ title: 'Add a beer to the catalog' })
  create(@Body() beer: BeerDto) {
    this.logger.log(`Calling PUT /api/v1/beers`);

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
  @ApiOperation({ title: 'Return a beer' })
  findOne(@Param('id', new ParseIntPipe()) id: number): Beer {
    this.logger.log(`Calling GET /api/v1/beers/${id}`);

    const beer: Beer = this.beersService.findOneById(id);
    if (beer === undefined) {
      throw new BeerUnavailableException(id);
    }
    return beer;
  }

  @Post()
  @ApiOperation({ title: 'Update a beer' })
  update(@Body() beer: BeerDto) {
    this.logger.log(`Calling POST /api/v1/beers`);

    const findBeer: Beer = this.beersService.findOneById(beer.id);
    if (findBeer === undefined) {
      throw new BeerUnavailableException(beer.id);
    }
    return this.beersService.update(beer);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ title: 'Delete a Beer' })
  delete(@Param('id', new ParseIntPipe()) id: number) {
    this.logger.log(`Calling DELETE /api/v1/beers/${id}`);

    return 'OK';
  }
}
