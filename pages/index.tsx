import type { NextPage } from "next";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import useSWR from "swr";
import { fetcher, filterProducts } from "../utils";
import { Products } from "../components/Products";
import { Product, Filter, Response } from "../models";
import { useState } from "react";
import { Filters } from "../components/Filters";
import { useFilter } from "../providers/filterProvider";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { products } = useFilter();

  return (
    <div className="bg-main relative">
      <Header />
      <Banner />
      <Filters />
      {products && <Products products={products} />}
    </div>
  );
};

export default Home;
