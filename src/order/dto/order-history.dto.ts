import { IsNotEmpty, IsString } from "class-validator";

export class OrderHistoryDTO {
  @IsString()
  @IsNotEmpty()
  note: string;
}