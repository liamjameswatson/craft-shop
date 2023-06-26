import "./featured.scss";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>

      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">£420</p>
        <p className="description">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">
              Target
              <div className="itemResult negative">
                <ArrowDownwardOutlinedIcon fontSize="small" />
                <div className="itemAmmount">£12.4k</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">
              Last Week
              <div className="itemResult positive">
                <ArrowUpwardOutlinedIcon  fontSize="small" />
                <div className="itemAmmount">£12.4k</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">
              Last Month
              <div className="itemResult positive">
                <ArrowUpwardOutlinedIcon fontSize="small" />
                <div className="itemAmmount">£12.4k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
