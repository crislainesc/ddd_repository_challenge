import OrderItem from './order_item';

describe('Order Item unit tests', () => {
  it('should return price', () => {
    const orderItem = new OrderItem('123', `Item 123`, 10, '123', 5);

    expect(orderItem.price).toBe(10);
  });

  it('should return quantity', () => {
    const orderItem = new OrderItem('123', `Item 123`, 10, '123', 5);

    expect(orderItem.quantity).toBe(5);
  });

  it('should return ordem item total', () => {
    const orderItem = new OrderItem('123', `Item 123`, 10, '123', 5);

    expect(orderItem.orderItemTotal()).toBe(
      orderItem.price * orderItem.quantity
    );
  });
});
