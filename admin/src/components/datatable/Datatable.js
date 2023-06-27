import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { userColumns, userRows } from "../../dataTableData";

const Datatable = () => {
  const cellButtons = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellButtons">
            <div className="viewButton">View</div>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        rows={userRows}
        columns={userColumns.concat(cellButtons)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[8]}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
