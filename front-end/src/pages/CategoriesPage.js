import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";

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
  return (
    <Container>
      <NavBar />
      <Title>Art</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
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
          <Select>
            <Option disabled selected>
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
          <Select>
            <Option selected>Latest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default CategoriesPage;
