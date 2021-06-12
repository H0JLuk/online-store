import { IsArray, IsInt, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { DeviceInfo } from 'src/device-info/models/deviceInfo';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({ minLength: 2, maxLength: 20, example: '12 Pro' })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly name: string;

  @ApiProperty({ type: Number, minimum: 0, example: 15000 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly price: number;

  @ApiProperty({ type: [DeviceInfo], required: false })
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeviceInfo)
  readonly deviceInfo: DeviceInfo[];

  @ApiProperty({ minimum: 0, example: 1, description: 'brand id' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly brandId: number;

  @ApiProperty({ minimum: 0, example: 1, description: 'type id' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly typeId: number;
}
