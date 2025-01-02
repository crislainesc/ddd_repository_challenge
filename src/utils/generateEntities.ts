import Order from '../domain/entity/order';
import OrderItem from '../domain/entity/order_item';
import Product from '../domain/entity/product';

export const generateOrders = (
  totalOrders: number
): { orders: Order[]; total: number } => {
  const orders = [];
  let total = 0;
  for (let i = 0; i < totalOrders; i++) {
    const orderNumber = i + 1;
    const order = new Order(
      `${orderNumber}`,
      `Customer ${orderNumber}`,
      generateOrderItems(2).items
    );
    total += order.total();
    orders.push(order);
  }
  return { orders, total };
};

export const generateOrderItems = (
  totalItems: number,
  quantity: number = 2,
  productId: string = '123'
): { items: OrderItem[]; total: number } => {
  const items = [];
  let total = 0;
  for (let i = 0; i < totalItems; i++) {
    const itemNumber = i + 1;
    const price = itemNumber * 10;
    total += price * 2;
    items.push(
      new OrderItem(
        `${itemNumber}`,
        `Item ${itemNumber}`,
        price,
        productId,
        quantity
      )
    );
  }
  return { items, total };
};

export const generateProducts = (
  totalProducts: number
): { products: Product[]; total: number } => {
  const products = [];
  let total = 0;
  for (let i = 0; i < totalProducts; i++) {
    const productNumber = i + 1;
    const price = productNumber * 10;
    total += price * 2;
    products.push(
      new Product(`${productNumber}`, `Product ${productNumber}`, price)
    );
  }
  return { products, total };
};
