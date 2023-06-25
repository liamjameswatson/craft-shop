import styled from "styled-components";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethod";
// const KEY = process.env.REACT_APP_STRIPE;
const KEY =
  "pk_test_51NMb37E0M3VJHghm18HiuWzNJdpG7ey2TTIcW1WDQWChgaHoX0kBoiFkeWSNsXt2GRVRVS1qiHL9j01vwdmWXZQA00ZdC6H5Wc";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile(` padding: 10px`)}
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

const TopTexts = styled.div`
  ${mobile(`display: none`)}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  ${mobile(` flex-direction: column`)}
`;
const Info = styled.div`
  flex: 3;
  width: 50%;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile(` flex-direction: column`)}
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
  ${mobile(` margin: 5px 15px `)}
`;
const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
  ${mobile(`margin-bottom: 20px`)}
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
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Basket = () => {
  const basket = useSelector((state) => state.basket);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          // amount: basket.total * 100,
          amount: 500,
        });
        navigate.push("/success", { data: res.data });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && basket.total >= 1 && makeRequest();
  }, [stripeToken, basket.total, navigate]);

  // console.log(stripeToken);
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
            {basket.products.map((product) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <strong>Product:</strong>
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <strong>ID:</strong> {product._id}
                      </ProductId>
                      <ProductColor color={product.color}></ProductColor>
                      <ProductSize>
                        <strong>Size:</strong> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductQuantityContainer>
                      <AddIcon></AddIcon>
                      <ProductQuantity>{product.quantity}</ProductQuantity>
                      <RemoveIcon></RemoveIcon>
                    </ProductQuantityContainer>
                    <ProductPrice>
                      {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>£ {basket.total}</SummaryItemPrice>
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
              <SummaryItemPrice>{basket.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Craft Shop"
              image="https://i.etsystatic.com/18891458/r/il/7f4f8d/3146030942/il_794xN.3146030942_5t2r.jpg"
              billingAddress
              shippingAddress
              description={`Your total is £${basket.total * 100}`}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>Checkout now</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Basket;
