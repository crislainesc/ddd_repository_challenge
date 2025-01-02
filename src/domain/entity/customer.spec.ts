import Address from './address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw an error when id is empty', () => {
    expect(() => {
      new Customer('', 'Amy Doe');
    }).toThrow('Id is required');
  });

  it('should throw an error when name is empty', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrow('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'Amy Doe');

    customer.changeName('New name');

    expect(customer.name).toBe('New name');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'Alice Doe');
    const address = new Address('Main St', 'Springfield', 742, '12345');
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should throw an error when address is undefined when activating customer', () => {
    const customer = new Customer('123', 'Alice Doe');

    expect(() => {
      customer.activate();
    }).toThrow('Address is mandatory to activate a customer');
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'Alice Doe');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {
    const customer = new Customer('123', 'Alice Doe');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
  });
});
