import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sidebar/SideBar";
import "./homePageAdmin.scss";

const HomePageAdmin = () => {
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        HOME CONTAINER
      </div>
    </div>
  );
};

export default HomePageAdmin;
