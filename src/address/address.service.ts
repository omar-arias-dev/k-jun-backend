import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { Model } from 'mongoose';
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
    const createdAddress = new this.addressModel(addressDto);
    return createdAddress.save();
  }

  async suspendAddressById(id: string) {
    const address = await this.findAddressById(id);
    address.status = false;
    return address.save();
  }

  async updateAddressById(id: string, address: UpdateAddressDTO) {
    const addressUpdated = await this.addressModel.findByIdAndUpdate(id, address, { new: true });
    if (!addressUpdated) {
      throw new NotFoundException(`Address with id ${id} not found.`);
    }
    return addressUpdated;
  }
}
