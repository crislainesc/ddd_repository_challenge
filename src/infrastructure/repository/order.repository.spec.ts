import { Sequelize } from 'sequelize-typescript';
import OrderModel from '../db/sequelize/model/order.model';
import CustomerModel from '../db/sequelize/model/customer.model';
import ProductModel from '../db/sequelize/model/product.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import Customer from '../../domain/entity/customer';
import Address from '../../domain/entity/address';
import CustomerRepository from './customer.repository';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';
import { generateOrderItems } from '../../utils/generateEntities';
import Order from '../../domain/entity/order';
import OrderRepository from './order.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer', 100);
    const address = new Address('Main St', 'Springfield', 742, '12345');
    customer.changeAddress(address);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product', 100);

    await customerRepository.create(customer);
    await productRepository.create(product);

    const { items: orderItems } = generateOrderItems(2, 3, product.id);
    const order = new Order('1', customer.id, orderItems);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: orderItems.map((item) => ({
        id: item.id,
        order_id: order.id,
        name: item.name,
        product_id: item.productId,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  });
});
