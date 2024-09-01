import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { Model, Types } from 'mongoose';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';

@Injectable()
export class AddressService {

  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  findAddressById(id: string) {
    const address = this.addressModel.findById(id);
    if (!address) {
      throw new NotFoundException("Address not found.");
    }
    return address;
  }

  createAddress(addressDto: CreateAddressDTO) {
    const newAddress: CreateAddressDTO = {
      ...addressDto,
      customer: new Types.ObjectId(addressDto.customer),
    }
    const createdAddress = new this.addressModel(newAddress);
    return createdAddress.save();
  }

  async suspendAddressById(id: string) {
    const address = await this.findAddressById(id);
    address.status = false;
    return address.save();
  }

  async updateAddressById(id: string, address: UpdateAddressDTO) {
    const addressUpdated = await this.addressModel.findByIdAndUpdate(id, { ...address, apartment_number: address.apartment_number ?? null }, { new: true });
    if (!addressUpdated) {
      throw new NotFoundException(`Address with id ${id} not found.`);
    }
    return addressUpdated;
  }

  async getAllCustomerAddresses(customerId: string) {
    const addresses = await this.addressModel.find({ customer: new Types.ObjectId(customerId) });
    if (!addresses) {
      throw new NotFoundException(`Addresses not found.`);
    }
    return addresses;
  }
}
