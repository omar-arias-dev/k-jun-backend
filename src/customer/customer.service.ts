import { BadRequestException, ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Customer } from './customer.schema';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAllCustomers() {
    try {
      return this.customerModel.find({ status: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findCustomerById(id: string) {
    try {
      const customer = await this.customerModel.findById(id);
      if (!customer) throw new NotFoundException(`Customer with id: ${id} not found.`);
      return customer;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCustomer(createCustomerDto: CreateCustomerDTO) {
    try {
      const newCustomer = new this.customerModel(createCustomerDto);
      const savedNewCustomer = await newCustomer.save();
      if (!savedNewCustomer) throw new ConflictException("Error at creating customer.");
      return savedNewCustomer;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDTO) {
    try {
      if (!updateCustomerDto.status) return new NotAcceptableException("Customer is no active");
      const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });
      if (!updatedCustomer) throw new NotFoundException(`Customer with id: ${id} not found.`);
      return updatedCustomer;
    } catch (error) {
      throw new Error(error);
    }
  }

  async suspendCustomer(id: string) {
    try {
      const customer = await this.customerModel.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );
      if (!customer) return new NotFoundException(`Customer with id ${id} not found.`);
      return customer;
    } catch (error) {
      throw new Error(error);
    }
  }
}
