import "./singleAdmin.scss";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navBar/NavBar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const SingleAdmin = () => {
  return (
    <div className="single">
      <SideBar />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://stepbysteppainting.net/wp-content/uploads/2019/10/img_0968-2-735x928.jpg"
                alt=""
                className="itemImage"
              />
              <div className="details">
                details
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemmValue">janedoe@htmaol.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemmValue">
                    Elton St. 234 Garden yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemmValue">UK</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleAdmin;
