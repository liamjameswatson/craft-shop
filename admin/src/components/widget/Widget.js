import "./widget.scss";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100
  const percentageDifference = 20

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: <PersonOutlineOutlinedIcon classes="icon" style={{color: 'crimson', backgroundColor: 'rgba(255, 0, 0, 0.2)'}}/>,
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: <ShoppingBasketOutlinedIcon classes="icon" style={{color: 'goldenrod', backgroundColor: 'rgba(218, 165, 32, 0.2)'}}/>,
      };
      break;
    case "earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: <MonetizationOnOutlinedIcon  classes="icon" style={{color: 'green', backgroundColor: 'rgba(0, 128, 0, 0.2)'}}/>,
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See all details",
        icon: <AccountBalanceIcon classes="icon" style={{color: 'purple', backgroundColor: 'rgba(255, 0, 128, 0.2)'}}/>,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      {data  ? (
      <>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && "£"} {amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <ArrowUpwardOutlinedIcon /> {percentageDifference}%
        </div>
        {data.icon}
      </div>
      </>
      ) : <div><h3>No data to dsiplay</h3></div>}
    </div>
  );
};

export default Widget;
