import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { Filter, Pagination, Product, Response } from "../models";
import { fetcher, filterProducts, makePaginatable } from "../utils";

const FilterContext = createContext<{
  products: Product[];
  pagination: Pagination;
  onQueryChange: (queryValue: string, queryName: string) => void;
  onClear: VoidFunction;
  onRangeChange: (type: "max" | "min", value: string | number) => void;
  setPage: (page: number) => void;
}>({
  products: [],
  pagination: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
  },
  onQueryChange: () => {},
  onClear: () => {},
  onRangeChange: () => {},
  setPage: () => {},
});

export const FilterProvider: FC = ({ children }) => {
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const { query, push } = useRouter();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
  });

  const { data } = useSWR<Response<Product[]>>(`/api/products`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (data) {
      const {
        data: {
          allContentfulProductPage: { edges },
        },
      } = data;

      const _filteredData = filterProducts(query, edges);

      setPagination({
        currentPage:
          pagination.currentPage > Math.ceil(_filteredData.length / 9)
            ? 1
            : pagination.currentPage,
        totalCount: _filteredData.length,
        totalPages: Math.ceil(_filteredData.length / 9),
      });

      setFilteredData(makePaginatable(_filteredData, pagination.currentPage));
    }
  }, [data, query, pagination.currentPage]);

  const handleQueryChange = (queryValue: string, queryName: string) => {
    let newQueries;

    if (queryValue === "all") {
      newQueries = "";
    } else {
      const queries = query[queryName]
        ? (query[queryName] as string).split(";")
        : [];

      const isSelected = queries.some(
        (q) => q.toLowerCase() === queryValue.toLowerCase()
      );

      if (isSelected) {
        newQueries = queries
          .filter((q) => q.toLowerCase() !== queryValue.toLowerCase())
          .join(";");
      } else {
        newQueries = [...queries, queryValue].join(";");
      }
    }

    push(
      {
        query: {
          ...query,
          [queryName]: newQueries,
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  const handleRangeChange = (type: "max" | "min", value: string | number) => {
    const { prices } = query;
    let newPrices = "";

    if (prices) {
      const pricesArr = (prices as string).split(";");

      if (type === "max") {
        newPrices += [pricesArr[0], value].join(";");
      } else {
        newPrices += [value, pricesArr[1]].join(";");
      }
    } else {
      if (type === "max") {
        newPrices += `0,${value}`;
      } else {
        newPrices += value;
      }
    }

    push({ query: { ...query, prices: newPrices } }, undefined, {
      scroll: false,
    });
  };

  const handleClearFilter = () => {
    push(
      {
        query: {},
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  return (
    <FilterContext.Provider
      value={{
        pagination,
        products: filteredData,
        onQueryChange: handleQueryChange,
        onClear: handleClearFilter,
        onRangeChange: handleRangeChange,
        setPage: handlePageChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
