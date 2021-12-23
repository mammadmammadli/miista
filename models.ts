export interface Criteria {
  filter: (products: Product[]) => Product[];
}

export interface Response<T> {
  data: {
    allContentfulProductPage: {
      edges: T;
    };
  };
}

export interface Product {
  node: {
    name: string;
    node_locale: string;
    thumbnailImage: {
      file: {
        url: string;
      };
    };
    colorFamily: {
      name: string;
    }[];
    categoryTags: string[];
    shopifyProductEu: {
      variants: {
        edges: {
          node: {
            price: string;
          };
        }[];
      };
    };
  };
}

export interface Filter {
  colors: string[];
  tags: string[];
  prices: string[];
}

export interface Pagination {
  totalCount: number;
  currentPage: number;
  totalPages: number
}