import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class CustomAddressDTO {
  @IsString()
  @IsNotEmpty()
  customer_name: string;
  
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  @Length(5)
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}