import { generateProducts } from '../../utils/generateEntities';
import ProductService from './product_service';

describe('Product service unit tests', () => {
  it('should change the prices of all products', () => {
    const { products } = generateProducts(3);

    ProductService.increasePrice(products, 100);

    generateProducts(3).products.forEach((product, index) => {
      expect(products[index].price).toBe(
        product.price + (product.price * 100) / 100
      );
    });
  });
});
