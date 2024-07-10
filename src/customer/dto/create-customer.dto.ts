import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';

export class CreateCustomerDTO {
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
  @IsOptional()
  status?: boolean;
/* 
  @IsOptional()
  @ValidateNested({ each: true })
  address?: CustomerAddressDTO[]; */
}