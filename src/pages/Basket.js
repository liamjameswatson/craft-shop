import styled from "styled-components";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
  width: 50%;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductQuantity = styled.span`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  /* text-transform: uppercase; */
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryItemButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Basket = () => {
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Title>Your Basket</Title>
        <Top>
          <TopButton>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Bssket(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="https://imagedelivery.net/0ObHXyjKhN5YJrtuYFSvjQ/i-597d495a-a7dd-464a-9c20-9d30de5eb154-beautiful-handmade-macrame-fairy-flower-doll-nursery-decor-baby-gift-namaste-crafts/display" />
                <Details>
                  <ProductName>
                    <strong>Product:</strong> Doll
                  </ProductName>
                  <ProductId>
                    <strong>ID:</strong> 5835uehe833
                  </ProductId>
                  <ProductColor color="#dc27b8"></ProductColor>
                  <ProductSize>
                    <strong>Size:</strong> 15.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductQuantityContainer>
                  <AddIcon></AddIcon>
                  <ProductQuantity>2</ProductQuantity>
                  <RemoveIcon></RemoveIcon>
                </ProductQuantityContainer>
                <ProductPrice>£30</ProductPrice>
              </PriceDetail>
            </Product>

            <Hr />

            <Product>
              <ProductDetail>
                <Image src="https://i.pinimg.com/550x/fc/6b/d8/fc6bd85862bf720a5cc87d28574dcbed.jpg" />
                <Details>
                  <ProductName>
                    <strong>Product:</strong> diamondpainting5doll with flower
                  </ProductName>
                  <ProductId>
                    <strong>ID:</strong> 5835uehe833
                  </ProductId>
                  <ProductColor color="#dc2727"></ProductColor>
                  <ProductSize>
                    <strong>Size:</strong> 10.4
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductQuantityContainer>
                  <AddIcon></AddIcon>
                  <ProductQuantity>2</ProductQuantity>
                  <RemoveIcon></RemoveIcon>
                </ProductQuantityContainer>
                <ProductPrice>£30</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>£80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimate Shipping</SummaryItemText>
              <SummaryItemPrice>£5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>£-5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>£80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItemButton>Checkout now</SummaryItemButton>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Basket;
