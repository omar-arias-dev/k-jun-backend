import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { Query as ExpressQuery } from "express-serve-static-core";
import { CreateOrderDTO } from './dto/create-order.dto';
import { Product } from 'src/product/product.schema';
import { OrderHistoryDTO } from './dto/order-history.dto';
import { AddItemsOrderDTO } from './dto/add-items-order.dto';
import { UpdateOrderStatusDTO } from './dto/update-order-status.dto';
import { UpdateOrderPaymentMethodDTO } from './dto/update-order-payment-method.dto';
import { UpdateOrderTypeDTO } from './dto/update-order-type.dto';
import { CounterService } from 'src/counter/counter.service';
import { OrderHistory } from './schema/order-history.schema';
@Injectable()
export class OrderService {
  readonly ACRONYM: string;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(OrderHistory.name) private orderHistoryModel: Model<OrderHistory>,
    private configService: ConfigService,
    private counterService: CounterService,
  ) {
    this.ACRONYM = this.configService.get("acronym") ?? null;
  }

  async getAllPopulatedPaginatedOrdersWithQuery(query: ExpressQuery) {
    try {
      const limit = Number(query?.limit) || 25;
      const page = Number(query?.page) || 1;
      const skip = limit * (page - 1);
      
      const keyword = query?.keyword ?
        {
          order_number: {
            $regex: query?.keyword,
            $options: "i",
          },
          /* type: {
            $regex: query?.keyword,
            $options: "i",
          },
          status: {
            $regex: query?.keyword,
            $options: "i",
          }, */
        }
        :
        {};
      const orders = await this.orderModel.find({ ...keyword })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .lean()
        .populate("address")
        .populate("items.product")
        .exec();
      const totalDocuments = await this.orderModel.countDocuments().exec();
      return {total_documents: totalDocuments ?? 0, orders: orders ?? []} ?? {};
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await this.orderModel.findById(id)
        .lean()
        .populate("address")
        .populate("items.product")
        .exec();
      if (!order) return new NotFoundException("Order Not found.");
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrdersByType(type: string) {
    try {
      const orders = await this.orderModel.find({ type })
        .lean()
        .sort({ createdAt: -1 })
        .populate("address")
        .populate("items.product")
        .exec();
      if (!orders) return new NotFoundException("Orders Not found.");
      return orders;  
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async createOrder(orderDto: CreateOrderDTO) {
    try {
      const productsIdsList = orderDto.items.map(item => item.product.toString());
      const productList = await this.productModel.find({ _id: { $in: productsIdsList } }).exec();
      const total = productList
        .map((product) => orderDto.items.find((item) => product._id.toString() === item.product._id.toString()).quantity * product.price)
        .reduce((total, current) => total + current, 0);
      if (total !== orderDto.total) return new NotAcceptableException("Order's total and total by products price don't match. Verify prices.");
      const orderProductsHistory = orderDto.items.map(item => {
        const quantity = item.quantity;
        const productName = productList.find((product) => product._id.toString() === item.product.toString()).name ?? "";
        return `Product: ${productName}, Quantity: ${quantity}`;
      }).join(" - ");
      const seq = await this.counterService.getNextSequenceValue("orders");
      if (!seq) return new InternalServerErrorException("Error at retrive sequence.");
      const orderNumber = `${this.ACRONYM}${seq.toString().padStart(5, '0')}`;
      const history: OrderHistoryDTO = {
        note: `Order created. ${orderProductsHistory}.`,
      }
      const order = new this.orderModel({
        ...orderDto,
        order_number: orderNumber,
        history: history,
      });
      const savedOrder = await order.save();
      if (!savedOrder) return new BadRequestException("Orden cannot be saved.");
      return savedOrder;
    } catch (error) {
      throw new Error(error);
    }
  }


  async updateOrderItems(
    id: string,
    items: AddItemsOrderDTO,
  ) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) return new NotFoundException("Order Not found.");
      const itemsProductsIdsList = items.items.map(item => item.product.toString());
      const itemsProductList = await this.productModel.find({ _id: { $in: itemsProductsIdsList } }).exec();
      const total = itemsProductList
          .map((product) => items.items.find((item) => product._id.toString() === item.product._id.toString()).quantity * product.price)
          .reduce((total, current) => total + current, 0);
      if (total !== items.order_total) return new NotAcceptableException("Order's total and total by products price don't match. Verify prices.");
      const orderProductsHistory = items.items.map(item => {
        const quantity = item.quantity;
        const productName = itemsProductList.find((product) => product._id.toString() === item.product.toString()).name ?? "";
        return `Product: ${productName}, Quantity: ${quantity}`;
      }).join(" - ");
      const history: OrderHistoryDTO = {
        note: `Order items updated. ${orderProductsHistory}.`,
      };
      order.items = [...items.items];
      order.total = total;
      order.history.push(history);
      const orderUpdated = await order.save();
      if (!orderUpdated) return new InternalServerErrorException("Error updating order.");
      return orderUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOrderStatus(id: string, status: UpdateOrderStatusDTO) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) return new NotFoundException("Order Not found.");
      const history: OrderHistoryDTO[] = [...order.history];
      history.push({
        note: `Order was updated with status ${status.status}.`,
      });
      order.history = history;
      order.status = status.status;
      const savedOrder = await order.save();
      if (!savedOrder) return new InternalServerErrorException("Order Was not be saved.");
      return savedOrder;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOrderPaymentMethod(id: string, paymentMethod: UpdateOrderPaymentMethodDTO) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) return new NotFoundException("Order Not found.");
      const history: OrderHistoryDTO[] = [...order.history];
      history.push({
        note: `Order payment method was updated. ${paymentMethod.payment_method}.`,
      });
      order.history = history;
      order.payment_method = paymentMethod.payment_method;
      const savedOrder = await order.save();
      if (!savedOrder) return new InternalServerErrorException("Order Was not be saved.");
      return savedOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async updateOrderType(id: string, type: UpdateOrderTypeDTO) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) return new NotFoundException("Order Not found.");
      const history: OrderHistoryDTO[] = [...order.history];
      history.push({
        note: `Order type was updated. ${type.type}.`,
      });
      order.history = history;
      order.type = type.type;
      const savedOrder = await order.save();
      if (!savedOrder) return new InternalServerErrorException("Order Was not be saved.");
      return savedOrder;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOrderHistory(id: string, histories: OrderHistoryDTO[]) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) return new NotFoundException("Order Not found.");
    const history: OrderHistory[] = [...order.history] || [];
    const newEntries = histories.map(dto => new this.orderHistoryModel(dto));
    const allEntries = [...history, ...newEntries];
    order.set("history", allEntries);
    const updatedOrder = await order.save();
    if (!updatedOrder) return new InternalServerErrorException("Order Couldn't be updated.");
    return updatedOrder;
  }
}
