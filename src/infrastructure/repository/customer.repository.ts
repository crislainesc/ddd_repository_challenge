import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerRepositoryInterface from '../../domain/repository/customer-repository.interface';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerFound;

    try {
      customerFound = await CustomerModel.findOne({ where: { id: id } });
    } catch (error) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(customerFound.id, customerFound.name);
    customer.addRewardPoints(customerFound.rewardPoints);

    const address = new Address(
      customerFound.street,
      customerFound.city,
      customerFound.number,
      customerFound.zip
    );
    customer.changeAddress(address);
    if (customerFound.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customersFound = await CustomerModel.findAll();

    return customersFound.map((customerFound) => {
      const customer = new Customer(customerFound.id, customerFound.name);
      customer.addRewardPoints(customerFound.rewardPoints);
      const address = new Address(
        customerFound.street,
        customerFound.city,
        customerFound.number,
        customerFound.zip
      );
      customer.changeAddress(address);
      if (customerFound.active) {
        customer.activate();
      }

      return customer;
    });
  }
}
