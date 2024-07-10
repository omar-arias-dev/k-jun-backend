import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';

@ApiTags("Addresses")
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}
  
  @Get(":id")
  getAddressById(@Param("id") id: string) {
    return this.addressService.findAddressById(id);
  }

  @Delete(":id")
  suspendAddressById(@Param("id") id: string) {
    return this.addressService.suspendAddressById(id);
  }

  @Post()
  createAddress(@Body() body: CreateAddressDTO) {
    return this.addressService.createAddress(body);
  }

  @Put(":id")
  updateAddressById(
    @Param("id") id: string,
    @Body() body: UpdateAddressDTO
  ) {
    return this.addressService.updateAddressById(id, body);
  }
}
