import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import Customer from '../../domain/entity/customer';
import CustomerRepository from './customer.repository';
import Address from '../../domain/entity/address';

describe('Customer repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const address = new Address('Main St', 'Springfield', 742, '12345');

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer', 100);
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer', 100);
    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName('Customer edited');

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer', 100);
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerFound = await customerRepository.find('1');

    expect(customer).toStrictEqual(customerFound);
  });

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => await customerRepository.find('459895')).rejects.toThrow(
      'Customer not found'
    );
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('1', 'Customer 1', 100);
    customer1.changeAddress(address);

    const customer2 = new Customer('2', 'Customer 2', 200);
    customer2.changeAddress(address);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customersFound = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(customers).toEqual(customersFound);
  });
});
