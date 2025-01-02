import Address from './domain/entity/address';
import Customer from './domain/entity/customer';
import Order from './domain/entity/order';
import { generateOrderItems } from './utils/generateEntities';

let customer = new Customer('1', 'Amy Doe');
const address = new Address('Main St', 'Springfield', 742, '12345');
customer.changeAddress(address);
customer.activate();

const order = new Order('1', customer.id, generateOrderItems(3).items);
console.log(order);
