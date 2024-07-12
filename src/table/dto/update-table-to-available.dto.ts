import mongoose from "mongoose";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TableStatus } from "src/enum/table-enum";

export class UpdateTableToAvailableDTO {
  @IsEnum(TableStatus)
  @IsNotEmpty()
  available: TableStatus;

  @IsNotEmpty()
  current_order: mongoose.Types.ObjectId;
}