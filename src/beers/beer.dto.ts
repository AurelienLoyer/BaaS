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
import { UuidValidator } from './validators/id.validator';
import { ExtensionValidator } from './validators/extension.validator';
import { ObjectType, Field, Int } from 'type-graphql';
@ObjectType()
export class BeerDto {
  @IsNumber()
  @Validate(UuidValidator)
  @ApiModelProperty({ example: 12 })
  @Field(() => Int)
  readonly id: number;

  @IsString()
  @ApiModelProperty({ example: 'Souper beer' })
  @Field()
  readonly label?: string;

  @IsString()
  @Length(10, 80)
  @ApiModelProperty({
    example:
      'India pale ale is a hoppy beer style within the broader category of pale ale',
  })
  @Field()
  readonly description?: string;

  @Validate(ExtensionValidator)
  @ApiModelProperty({ example: '' })
  @Field()
  readonly image?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @ApiModelProperty({ example: 15.0 })
  @Field(() => Int)
  readonly price?: number;

  @IsInt()
  @ApiModelProperty({ example: 5 })
  @Field(() => Int)
  readonly stock?: number;
}
