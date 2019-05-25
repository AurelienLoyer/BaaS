import { ApiModelProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiModelProperty({example: 'john@snow.fr'})
    readonly email: string;

    @ApiModelProperty({example: 'beer'})
    readonly password: string;
}