import { IsString, IsEmail } from 'class-validator';

export class CreateCircleDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}