import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';

export class UpdateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsBoolean()
  status: boolean;
}