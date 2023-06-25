import "./sideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import BarChartSharpIcon from "@mui/icons-material/BarChartSharp";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Craft Shop</span>
      </div>
      <hr />
      <div className="middle">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <li>
            <PersonOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
          <li>
            <StoreRoundedIcon className="icon" />
            <span>Products</span>
          </li>
          <li>
            <CreditCardRoundedIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingRoundedIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL LINKS</p>

          <li>
            <BarChartSharpIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveRoundedIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">USER</p>

          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default SideBar;
