import { IsOptional, IsString } from 'class-validator';

export class AuthCircleDto {
  @IsString()
  typeOfAccess: string;

  @IsString()
  typeOfContent: string;

  @IsString()
  circleId: string;

  @IsOptional()
  @IsString()
  ownerOrganisationId?: string;
}
