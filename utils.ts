import { ColorCriteria } from "./classes/ColorCriteria";
import { PriceCriteria } from "./classes/PriceCriteria";
import { TagCriteria } from "./classes/TagCriteria";
import { TotalCriterias } from "./classes/TotalCriterias";
import { Product, Filter, Criteria } from "./models";

export const fetcher = (...args: any) => fetch(args).then((res) => res.json());

export type criterias = "colors" | "tags" | "prices";

const criteriaMapper = {
  colors: ColorCriteria,
  tags: TagCriteria,
  prices: PriceCriteria,
};

export const filterProducts = (query: any, products?: Product[]): Product[] => {
  if (products && products.length > 0) {
    const filters: any = {};

    Object.entries(query).forEach((q) => {
      const [key, value] = q;

      if (value && key !== "page") {
        filters[key] = value;
      }
    });

    const criterias = Object.entries(filters)
      .map((filter) => {
        const [name, value] = filter;
        const valueArr = (value as string).split(";");

        if (criteriaMapper[name as criterias]) {
          return new criteriaMapper[name as criterias](valueArr);
        }
      })
      .filter(Boolean);

    const totalCriterias = new TotalCriterias(criterias as Criteria[]);

    return totalCriterias.filter(products);
  }

  return [];
};

export const makePaginatable = (products: Product[], page: number) => {
  return products.slice(9 * page - 9, 9 * page);
};
