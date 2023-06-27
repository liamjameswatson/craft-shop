import "./listAdmin.scss";
import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navBar/NavBar";
import Datatable from "../../components/datatable/Datatable";

const ListAdmin = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
        <div className="datatable"></div>
      </div>
    </div>
  );
};

export default ListAdmin;
