import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 50px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  ${mobile(`
  margin: 5px;
    min-width: 150px;
    height: 200px
  `)}

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  //   width: 200px;
  //   height: 200px;
  //   border-radius: 50%;
  //   position: absolute;
  //   background-color: blue;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
  z-index: 2;
  object-fit: cover;
  /* ${mobile(`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  `)} */
`;

const Icon = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3 ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Title = styled.h1``;

const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.image}></Image>
      <Title>{item.title}</Title>
      <Info>
        <Icon>
          <ShoppingBasketOutlinedIcon />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteRoundedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
