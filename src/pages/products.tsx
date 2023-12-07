import React from "react";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";
import Products from "../components/Products/Products";

const ProductsPage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Products />
    </Main>
  );
};

export default ProductsPage;
