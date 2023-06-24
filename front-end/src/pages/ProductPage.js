import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile(` padding: '75%'; flex-direction: column`)}
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile(` height: '40vh'`)}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile(` padding: 10px`)}
`;
const Title = styled.h1`
  font-weight: 200;
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile(` width: 100%, margin: 0`)}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const PurchaseContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile(` width: 100%`)}
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Quantity = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  font-weight: 500;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const ProductPage = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [productId]);
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.image}></Image>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>{product.price}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Colour</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="grey" />
              <FilterColor color="white" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>25x25</FilterSizeOption>
                <FilterSizeOption>50x50</FilterSizeOption>
                <FilterSizeOption>75x75</FilterSizeOption>
                <FilterSizeOption>100x100</FilterSizeOption>
                <FilterSizeOption>150x150</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <PurchaseContainer>
            <QuantityContainer>
              <RemoveIcon></RemoveIcon>
              <Quantity>1</Quantity>
              <AddIcon></AddIcon>
            </QuantityContainer>
            <Button>Add to basket</Button>
          </PurchaseContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProductPage;
