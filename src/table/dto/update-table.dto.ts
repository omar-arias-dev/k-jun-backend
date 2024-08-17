import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateTableDTO {
  @IsString()
  @IsNotEmpty()
  table_number: string;
  
  @IsNumber()
  @IsNotEmpty()
  capacity: number;
  
  @IsString()
  @IsNotEmpty()
  notes: string;
}