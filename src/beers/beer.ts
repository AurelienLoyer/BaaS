import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsNumber,
  Min,
  Max,
  Length,
  Validate,
} from 'class-validator';

export class Beer {
  @IsNumber()
  @ApiModelProperty({ example: 12 })
  readonly id: number;

  @IsString()
  @ApiModelProperty({ example: 'Souper beer' })
  readonly label?: string;

  @IsString()
  @ApiModelProperty({
    example:
      'India pale ale is a hoppy beer style within the broader category of pale ale',
  })
  readonly description?: string;

  @IsString()
  @ApiModelProperty({ example: '' })
  readonly image?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiModelProperty({ example: 15.0 })
  readonly price?: number;

  @IsInt()
  @ApiModelProperty({ example: 5 })
  readonly stock?: number;
}