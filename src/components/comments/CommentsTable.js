import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getComments } from "../../services/operations";

const columns = [
  { field: 'time', headerName: 'Time', width: 200 },
  { field: "user_name", headerName: "Name", width: 100 },
  { field: "email", headerName: "Email", width: 180 },
  { field: "home_page", headerName: "Home Page", width: 150 },
  { field: "comment", headerName: "Comment", width: 400},
];

export const CommentsTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getComments().then(res => setRows(res));
  }, [])


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "time", sort: "desc" }],
          },
        }}
        rows={rows}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
      />
    </div>
  );
}