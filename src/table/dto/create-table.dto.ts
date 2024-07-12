import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTableDTO {
  @IsString()
  @IsNotEmpty()
  table_number: string;
  
  @IsNumber()
  @IsNotEmpty()
  capacity: number;
  
  @IsString()
  @IsNotEmpty()
  notes: string;
  
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}