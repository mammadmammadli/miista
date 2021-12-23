import { Criteria, Product } from "../models";

export class ColorCriteria implements Criteria {
  private colors: Set<string>;

  constructor(colors: string[]) {
    this.colors = new Set(colors);
  }

  filter(products: Product[]): Product[] {
    return products.filter((product) =>
      product.node.colorFamily?.some((color) =>
        this.colors.has(color.name.toLowerCase())
      )
    );
  }
}
