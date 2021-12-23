import { FC } from "react";
import { Product } from "../../models";
import styles from "./styles.module.css";

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="px-8 mb-10">
      <div className={styles.imageContainer}>
        <img src={product.node.thumbnailImage.file.url} alt="Product" />
      </div>
      <div className="flex justify-between">
        <div>
          <span className="text-sm">{product.node.name}</span>
        </div>
        <div>
          <span className="text-sm">
            €{product.node.shopifyProductEu.variants.edges[0].node.price}
          </span>
        </div>
      </div>
      <div className="flex">
        {product.node.categoryTags?.map((tag, i) => (
          <div key={i} className="mr-1">
            <span className="text-sm">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
