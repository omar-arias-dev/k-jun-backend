import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  Length,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import mongoose from 'mongoose';

export class UpdateAddressDTO {

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

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}