import Customer from '../entity/customer';
import {
  generateOrderItems,
  generateOrders,
} from '../../utils/generateEntities';
import OrderService from './order_service';

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('1', 'Amy Doe');
    const { items, total } = generateOrderItems(3);

    const order = OrderService.placeOrder(customer, items);

    expect(customer.rewardPoints).toBe(total / 2);
    expect(order.total()).toBe(total);
  });

  it('should get total of all orders', () => {
    const { orders, total: expectedTotal } = generateOrders(3);

    const total = OrderService.total(orders);

    expect(total).toBe(expectedTotal);
  });
});
