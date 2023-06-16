import React, { useState } from "react";
import { carouselSlides } from "../data";
import styled from "styled-components";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 10px;")}
  cursor: pointer;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 1.5s ease-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Image = styled.img`
  height: 80%;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500px;
  letter-spacing: 1.5px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
  const lastIndex = carouselSlides.length - 1;
  if (direction === "left") {
    setSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : lastIndex));
  } else {
    setSlideIndex((prevIndex) => (prevIndex < lastIndex ? prevIndex + 1 : 0));
  }
};

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftRoundedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {carouselSlides.map((item) => (
          <Slide bg={item.bg}>
            <ImageContainer>
              <Image src={item.image} />
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Button>{item.buttonText}</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightRoundedIcon />
      </Arrow>
    </Container>
  );
};

export default Carousel;
