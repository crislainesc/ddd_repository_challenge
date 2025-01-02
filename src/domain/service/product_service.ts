import Product from '../entity/product';

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      const price = product.price + (product.price * percentage) / 100;

      product.changePrice(price);
    });
    return products;
  }
}
