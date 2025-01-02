import Address from './address';

describe('Address unit tests', () => {
  it('should throw an error when street is empty', () => {
    expect(() => {
      new Address('', 'Springfield', 742, '12345');
    }).toThrow('Street is required');
  });

  it('should throw an error when city is empty', () => {
    expect(() => {
      new Address('Main St', '', 742, '12345');
    }).toThrow('City is required');
  });

  it('should throw an error when number is zero', () => {
    expect(() => {
      new Address('Main St', 'Springfield', 0, '12345');
    }).toThrow('Number is required');
  });

  it('should throw an error when zip is empty', () => {
    expect(() => {
      new Address('Main St', 'Springfield', 742, '');
    }).toThrow('Zip is required');
  });

  it('should return formatted address', () => {
    const address = new Address('Main St', 'Springfield', 742, '12345');

    expect(address.toString()).toBe('Main St, 742, 12345, Springfield');
  });
});
