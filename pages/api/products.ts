import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "../../assets/mocks/products";
import { TotalCriterias } from "../../classes/TotalCriterias";
import { ColorCriteria } from "../../classes/ColorCriteria";
import { PriceCriteria } from "../../classes/PriceCriteria";
import { TagCriteria } from "../../classes/TagCriteria";
import { Criteria, Product } from "../../models";

type criterias = "colors" | "tags" | "price";

const criteriaMapper = {
  colors: ColorCriteria,
  tags: TagCriteria,
  price: PriceCriteria,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.json(products);
  const filters: any = {};
  const page = req.query.page || "1";

  Object.entries(req.query).forEach((q) => {
    const [key, value] = q;

    if (value && key !== "page") {
      filters[key] = value;
    }
  });

  // const criterias: Criteria[] = Object.entries(filters).map((filter) => {
  //   const [name, value] = filter;
  //   const valueArr = (value as string).split(",");

  //   return new criteriaMapper[name as criterias](valueArr);
  // });

  // const totalCriterias = new TotalCriterias(criterias);

  // const results = totalCriterias
  //   .filter(products.data.allContentfulProductPage.edges as Edge[])
  //   .slice(9 * parseInt(page as string) - 9, 9 * parseInt(page as string));

  // res.status(200).json({
  //   totalCount: products.data.allContentfulProductPage.edges.length,
  //   totalPage: Math.floor(
  //     products.data.allContentfulProductPage.edges.length / 9
  //   ),
  //   data: results,
  // });
}
