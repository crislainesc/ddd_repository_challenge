import { inspect } from 'util';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_item';
import OrderRepositoryInterface from '../../domain/repository/order-repository.interface';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  private mapOrder(orderFound: OrderModel): Order {
    const orderItems = orderFound.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );
    const order = new Order(orderFound.id, orderFound.customer_id, orderItems);

    return order;
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    });

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      { where: { id: entity.id } }
    );

    entity.items.forEach(async (item) => {
      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      });
    });
  }

  async find(id: string): Promise<Order> {
    let orderFound;

    try {
      orderFound = await OrderModel.findOne({
        where: { id: id },
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error('Order not found');
    }

    return this.mapOrder(orderFound);
  }

  async findAll(): Promise<Order[]> {
    const ordersFound = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return ordersFound.map(this.mapOrder);
  }
}
