import { FC } from "react";
import { Product } from "../../models";
import { useFilter } from "../../providers/filterProvider";
import { Container } from "../Container";
import { Pagination } from "../Pagination";
import { ProductCard } from "../ProductCard/ProductCard";

type ProductsProps = {
  products: Product[];
};

export const Products: FC<ProductsProps> = ({ products }) => {
  const { pagination, setPage } = useFilter();

  return (
    <Container>
      <div className="grid grid-cols-3 grid-rows-3 -mx-8">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
      <div>
        <Pagination
          pages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onClick={setPage}
        />
      </div>
    </Container>
  );
};
