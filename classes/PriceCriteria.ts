import { Criteria, Product } from "../models";

export class PriceCriteria implements Criteria {
  private maxPrice: number = Infinity;
  private minPrice: number = 0;

  constructor(prices: string[]) {
    if (prices[0]) {
      this.minPrice = parseInt(prices[0]);
    }

    if (prices[1]) {
      this.maxPrice = parseInt(prices[1]);
    }
  }

  filter(products: Product[]): Product[] {
    return products.filter((product) =>
      product.node.shopifyProductEu.variants.edges.some((price) => {
        if (
          parseInt(price.node.price) > this.minPrice &&
          parseInt(price.node.price) < this.maxPrice
        ) {
          return true;
        }
      })
    );
  }
}
