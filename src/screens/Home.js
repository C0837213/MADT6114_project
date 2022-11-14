import React, { useContext } from "react";
import {
  Box,
} from "native-base";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <Box>
      <ProductList/>
    </Box>
  );
};

export default Home;