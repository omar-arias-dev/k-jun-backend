import {
  IsArray,
  IsBoolean,
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  price: number;

  @IsInt()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tags: Array<string>;
  
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
