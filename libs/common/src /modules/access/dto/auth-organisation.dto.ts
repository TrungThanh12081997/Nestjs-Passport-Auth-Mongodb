import { IsString } from 'class-validator';

export class AuthOrganisationDto {
  @IsString()
  organisationId: string;

  @IsString()
  typeOfAccess: string;

  @IsString()
  typeOfContent: string;
}
