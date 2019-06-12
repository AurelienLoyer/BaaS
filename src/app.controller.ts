import { Get, Controller, Render, Param, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
    @Get()
    @Render('index')
    @ApiExcludeEndpoint()
    root() {
        return { message: 'Hello world ! 🦄' };
    }

    @Get('static/img/:imageName')
    image(@Param('imageName') imageName, @Res() res) {
        return res.sendFile(`img/${imageName}`, { root: 'static' });
    }
}
