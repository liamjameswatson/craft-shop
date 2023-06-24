import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mobile`
    flex-direction: column;
    
    & > * {
      width: 100%;
    }
  `}

  ${mobile(`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  `)}
`;

const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:8000/api/products?category=${category}`
            : "http://localhost:8000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    const applyFilter = () => {
      if (category) {
        setFilteredProducts(
          products.filter((item) =>
            Object.entries(filter).every(
              ([key, value]) => item[key] && item[key].includes(value)
            )
          )
        );
      } else {
        setFilteredProducts([]);
      }
    };

    applyFilter();
  }, [products, category, filter]);

  useEffect(() => {
    if (sort === "latest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
