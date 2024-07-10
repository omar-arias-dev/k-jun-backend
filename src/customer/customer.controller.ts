import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@ApiTags("Customers")
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  getAllCustomers() {
    return this.customerService.findAllCustomers();
  }

  @Get(":id")
  findCustomerById(@Param("id") id: string) {
    return this.customerService.findCustomerById(id);
  }

  @Post()
  createCustomer(@Body() body: CreateCustomerDTO) {
    return this.customerService.createCustomer(body);
  }

  @Put(":id")
  updateCustomer(
    @Param("id") id: string,
    @Body() body: UpdateCustomerDTO,
  ) {
    return this.customerService.updateCustomer(id, body);
  }

  @Delete(":id")
  suspendCustomer(@Param("id") id: string) {
    return this.customerService.suspendCustomer(id);
  }
}
