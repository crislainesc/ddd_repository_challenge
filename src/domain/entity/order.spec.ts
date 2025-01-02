import { generateOrderItems } from '../../utils/generateEntities';
import Order from './order';

describe('Order unit tests', () => {
  const { items, total } = generateOrderItems(3);

  it('should throw an error when id is empty', () => {
    expect(() => {
      new Order('', '123', items);
    }).toThrow('Id is required');
  });

  it('should throw an error when customerId is empty', () => {
    expect(() => {
      new Order('123', '', items);
    }).toThrow('Customer Id is required');
  });

  it('should throw an error when items is empty', () => {
    expect(() => {
      new Order('123', '123', []);
    }).toThrow('Items quantity must be greater than zero');
  });

  it('should calculate total', () => {
    const order = new Order('123', '123', items);

    expect(order.total()).toBe(total);
  });

  it('should throw an error if the item quantity is greater than 0', () => {
    expect(() => {
      new Order('123', '123', generateOrderItems(2, -1).items);
    }).toThrow('Quantity must be greater than zero');
  });

  it('should change items', () => {
    const order = new Order('123', '123', items);
    const { items: newItems, total: newTotal } = generateOrderItems(3);

    order.changeItems(newItems);

    expect(order.items).toStrictEqual(newItems);
    expect(order.total()).toStrictEqual(newTotal);
  });
});
