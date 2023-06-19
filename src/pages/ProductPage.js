import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";

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
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <ImageContainer>
          <Image src="https://diamondpainting5d.com/wp-content/uploads/2022/05/Paignton-pier-paint-by-numbers.jpg"></Image>
        </ImageContainer>
        <InfoContainer>
          <Title>Paignton pier - acyrlic</Title>
          <Description>
            Laboris ea aute ad et eu quis fugiat. Culpa deserunt sunt irure ea
            incididunt veniam sit sint laboris amet fugiat reprehenderit
            occaecat. Commodo dolor incididunt voluptate tempor aute sint
            dolore. Cillum esse deserunt quis adipisicing. Eu duis elit deserunt
            ad in occaecat cillum proident tempor. Culpa id irure quis officia
            velit est elit eiusmod anim sint. Cillum veniam est ut et ad ullamco
            anim tempor laboris. Do ad velit elit incididunt excepteur aliquip
            aliquip nulla esse pariatur duis culpa. Reprehenderit velit laborum
            eu proident qui. Ea magna esse eiusmod nulla elit velit aute culpa.
            Nostrud nulla minim occaecat sunt aliquip elit in nostrud
            reprehenderit exercitation et nisi. Sunt irure aliquip id veniam
            sunt nulla incididunt esse. Reprehenderit sunt sit aliqua consequat
            sunt deserunt dolore quis ut ullamco deserunt amet. Laboris laboris
            sit ea velit dolor Lorem nulla commodo est do. Mollit pariatur
            laboris eiusmod enim. Eu eu aliquip occaecat tempor pariatur eu
            culpa tempor excepteur. Nostrud minim ex aliqua dolore do non
            eiusmod do et ut excepteur duis et. Reprehenderit commodo occaecat
            ad deserunt consequat enim elit cupidatat commodo cillum est fugiat
            quis.
          </Description>
          <Price>£200</Price>

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
