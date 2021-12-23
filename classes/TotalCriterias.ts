import { Criteria, Product } from "../models";

export class TotalCriterias implements Criteria {
  private criterias: Criteria[];

  constructor(criterias: Criteria[]) {
    this.criterias = criterias;
  }

  filter(products: Product[]): Product[] {
    let filteredProducts = products;

    this.criterias.forEach((criteria) => {
      filteredProducts = criteria.filter(filteredProducts);
    });

    return filteredProducts;
  }
}
