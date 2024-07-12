import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TableService } from './table.service';
import { CreateTableDTO } from './dto/create-table.dto';
import { UpdateTableToTakenDTO } from './dto/update-table-to-taken.dto';
import { UpdateTableToAvailableDTO } from './dto/update-table-to-available.dto';

@Controller('table')
@ApiTags("Tables")
export class TableController {
  constructor(
    private tableService: TableService,
  ) {}

  @Get()
  getAllTables() {
    return this.tableService.getAllTables();
  }

  @Post()
  createTable(
    @Body() createTableDto: CreateTableDTO
  ) {
    return this.tableService.createTable(createTableDto);
  }

  @Put("to-taken/:id")
  updateTableToTaken(
    @Param("id") id: string,
    @Body() body: UpdateTableToTakenDTO,
  ) {
    return this.tableService.updateTableToTaken(id, body);
  }
  
  
  @Put("to-available/:id")
  updateTableToAvailable(
    @Param("id") id: string,
    @Body() body: UpdateTableToAvailableDTO,
  ) {
    return this.tableService.updateTableToAvailable(id, body);
  }

  @Delete(":id")
  suspendTable(
    @Param("id") id: string,
  ) {
    return this.tableService.suspendTable(id);
  }
}
