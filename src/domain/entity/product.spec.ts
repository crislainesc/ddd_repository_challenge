import Product from './product';

describe('Product unit tests', () => {
  it('should throw an error when id is empty', () => {
    expect(() => {
      new Product('', 'Product Name', 100);
    }).toThrow('Id is required');
  });

  it('should throw an error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100);
    }).toThrow('Name is required');
  });

  it('should throw an error when price is less than zero', () => {
    expect(() => {
      new Product('123', 'Product Name', -100);
    }).toThrow('Price must be greater than zero');
  });

  it('should change name', () => {
    const product = new Product('123', 'Product Name', 100);

    product.changeName('New name');

    expect(product.name).toBe('New name');
  });

  it('should change price', () => {
    const product = new Product('123', 'Product Name', 100);

    product.changePrice(50);

    expect(product.price).toBe(50);
  });
});
