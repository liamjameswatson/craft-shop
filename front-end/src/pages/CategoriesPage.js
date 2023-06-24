import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1``;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const CategoriesPage = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("Latest");

  const handleFilter = (e) => {
    const value = e.target.value;

    setFilter({ ...filter, [e.target.name]: value.toLowerCase() });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };


  return (
    <Container>
      <NavBar />
      <Title>{category.charAt(0).toUpperCase() + category.slice(1)}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="catergory" onChange={handleFilter}>
            <Option disabled value>
              Catergory
            </Option>
            <Option>Art</Option>
            <Option>Craft</Option>
            <Option>Landscapes</Option>
            <Option>Wire Dolls</Option>
            <Option>Painting</Option>
            <Option>Drawing</Option>
            <Option>Cards</Option>
          </Select>
          <Select name="event" onChange={handleFilter}>
            <Option disabled value>
              Events
            </Option>
            <Option>Christmas</Option>
            <Option>Easter</Option>
            <Option>Summer</Option>
            <Option>Winter</Option>
            <Option>Spring</Option>
            <Option>Autumn</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            <Option value="latest">Latest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filter={filter} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default CategoriesPage;
