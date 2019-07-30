import {
  Get,
  Controller,
  Render,
  Param,
  Res,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly logger: Logger) {}

  @Get()
  @Render('index')
  @ApiExcludeEndpoint()
  root() {
    this.logger.log(`Calling /`);
    return { message: 'Hello world ! 🦄' };
  }

  @Get('static/img/:imageName')
  image(@Param('imageName') imageName, @Res() res) {
    this.logger.log(`Calling /static/img/${imageName}`);
    return res.sendFile(`img/${imageName}`, { root: 'static' });
  }
}
