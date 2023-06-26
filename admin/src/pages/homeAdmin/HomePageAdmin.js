import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sidebar/SideBar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from '../../components/chart/Chart'
import "./homePageAdmin.scss";

const HomePageAdmin = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="widgetContainer">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earnings" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default HomePageAdmin;
