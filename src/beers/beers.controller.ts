import { Controller, Get, Param } from '@nestjs/common';

@Controller('beers')
export class BeersController {

    constructor() {}

    @Get()
    findAll(): any[] {
        return [];
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        return {};
    }
}

