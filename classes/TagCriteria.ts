import { Criteria, Product } from "../models";

export class TagCriteria implements Criteria {
  private tags: Set<string>;

  constructor(tags: string[]) {
    this.tags = new Set(tags);
  }

  filter(products: Product[]): Product[] {
    return products.filter((product) =>
      product.node.categoryTags?.some((tag) => this.tags.has(tag))
    );
  }
}
