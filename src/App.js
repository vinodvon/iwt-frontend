import { useState } from "react";
import Button from "@mui/material/Button";
import ShowAllData from "./component/showData/table";
import AddMoreData from "./component/addData/addData";
import "./App.css";
function App() {
  const [openAdd, setOpenAdd] = useState(false);
  const [filter, setFilter] = useState(false);
  return (
    <div>
      <div className="App-header">
        <Button onClick={() => setOpenAdd(true)} variant="contained">
          Add
        </Button>
        <Button onClick={() => setFilter(!filter)} variant="contained">
          End Date Filter
          {filter ? (
            <span className="Filter-on"> On </span>
          ) : (
            <span className="Filter-off"> Off </span>
          )}
        </Button>
      </div>
      <AddMoreData isOpen={openAdd} setOpen={setOpenAdd} />
      <ShowAllData filter={filter} />
    </div>
  );
}

export default App;
