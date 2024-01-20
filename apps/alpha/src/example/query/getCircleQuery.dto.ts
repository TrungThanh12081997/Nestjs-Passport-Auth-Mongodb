import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class getCircleQuery {
  @IsOptional()
  @IsNumber()
  organisationId: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  @Transform(({ value }) => value === 'true')
  disabled: boolean;
}
