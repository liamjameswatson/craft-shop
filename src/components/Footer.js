import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const Logo = styled.h1``;
const Decription = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Middle = styled.div`
  flex: 1;
  padding: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>The Craft Shop.</Logo>
        <Decription>
          Magna anim nulla fugiat ad. Laborum officia excepteur exercitation
          amet non aliquip officia consectetur et id anim nulla. Quis velit enim
          pariatur in minim incididunt amet laborum minim excepteur cupidatat ut
          ea exercitation. Culpa eiusmod do quis veniam nisi laboris sunt et
          commodo.
        </Decription>
      </Left>
      <Middle>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Basket</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>About</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Middle>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <EmailRoundedIcon style={{ margin: "10px" }} />
          contact@email.com
        </ContactItem>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
        <SocialContainer>
          <SocialIcon color={"#3B5999"}>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color={"#E4405F"}>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color={"#55ACEE"}>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color={"#E60023"}>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Right>
    </Container>
  );
};

export default Footer;
