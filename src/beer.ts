import { ApiModelProperty } from '@nestjs/swagger';

export class Beer {
  @ApiModelProperty({ example: 12 })
  readonly id: number;

  @ApiModelProperty({ example: 'Souper beer' })
  readonly label?: string;

  @ApiModelProperty({
    example:
      'India pale ale is a hoppy beer style within the broader category of pale ale',
  })
  readonly description?: string;

  @ApiModelProperty({ example: '' })
  readonly image?: string;

  @ApiModelProperty({ example: 15.0 })
  readonly price?: number;

  @ApiModelProperty({ example: 5 })
  readonly stock?: number;
}