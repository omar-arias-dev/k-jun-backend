import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { OrderService } from './order.service';
import { Query as ExpressQuery } from "express-serve-static-core";
import { CreateOrderDTO } from './dto/create-order.dto';
import { AddItemsOrderDTO } from './dto/add-items-order.dto';
import { UpdateOrderStatusDTO } from './dto/update-order-status.dto';
import { UpdateOrderPaymentMethodDTO } from './dto/update-order-payment-method.dto';
import { UpdateOrderTypeDTO } from './dto/update-order-type.dto';
import { OrderHistoryDTO } from './dto/order-history.dto';

@Controller('order')
@ApiTags("Orders")
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Get()
  getAllOrders(
    @Query() query: ExpressQuery,
  ) {
    return this.orderService.getAllPopulatedPaginatedOrdersWithQuery(
      query,
    );
  }

  @Get(":id")
  getOrderById(@Param("id") id: string) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  createOrder(
    @Body() body: CreateOrderDTO,
  ) {
    if (body.customer) {
      body.customer = new Types.ObjectId(body.customer);
    }
    if (body.address) {
      body.address = new Types.ObjectId(body.address);
    }
    const items = body.items.map(item => ({ ...item, product: new Types.ObjectId(item.product) }));
    return this.orderService.createOrder({ ...body, items: items });
  }

  @Put("update-items/:id")
  addItemsOrder(
    @Param("id") id: string,
    @Body() body: AddItemsOrderDTO,
  ) {
    const items = body.items.map(item => ({ ...item, product: new Types.ObjectId(item.product) }));
    return this.orderService.updateOrderItems(id, {...body, items: items});
  }

  @Put("update-status/:id")
  updateOrderStatus(
    @Param("id") id: string,
    @Body() status: UpdateOrderStatusDTO,
  ) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Put("update-payment-method/:id")
  updateOrderPaymentMethodStatus(
    @Param("id") id: string,
    @Body() paymentMethod: UpdateOrderPaymentMethodDTO,
  ) {
    return this.orderService.updateOrderPaymentMethod(id, paymentMethod);
  }

  @Put("update-type/:id")
  updateOrderTypeStatus(
    @Param("id") id: string,
    @Body() type: UpdateOrderTypeDTO,
  ) {
    return this.orderService.updateOrderType(id, type);
  }

  @Put("update-history/:id")
  updateOrderHistory(
    @Param("id") id: string,
    @Body() histories: OrderHistoryDTO[],
  ) {
    return this.orderService.updateOrderHistory(id, histories);
  }
}
