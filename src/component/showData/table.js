import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { format } from "date-fns";

import { getDetails } from "../../redux/actions/index";

const columns = [
  {
    id: "person_name",
    label: "Name",
  },
  {
    id: "person_phone",
    label: "Phone",
  },
  {
    id: "address_end_date",
    label: "End Date",
  },
  {
    id: "address_line",
    label: "Address",
  },
  {
    id: "street",
    label: "Street",
  },
  {
    id: "city",
    label: "City",
  },
  {
    id: "state",
    label: "State",
  },
];
const RenderTable = ({ row, index }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
      {columns.map((column) => {
        let value = "";
        if (column.id === "address_end_date") {
          value = format(new Date(row[column.id]), "dd-MM-yyyy");
        } else {
          value = row[column.id];
        }
        return (
          <TableCell key={column.id} align="left">
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const ShowAllData = ({ filter }) => {
  const dispatch = useDispatch();
  const detailStore = useSelector((state) => state.detailStore);

  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState({
    columnId: "person_name",
    sortOrder: "a", //for ascending
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  useEffect(() => {
    if (detailStore) {
      setData(detailStore);
    }
  }, [detailStore]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const changeSortOrder = (columnId) => {
    if (sortBy.columnId === columnId) {
      if (sortBy.sortOrder === "a") {
        setSortBy({
          ...sortBy,
          sortOrder: "d",
        });
      } else {
        setSortBy({
          ...sortBy,
          sortOrder: "a",
        });
      }
    } else {
      setSortBy({
        columnId: columnId,
        sortOrder: "a",
      });
    }
  };

  data.sort((a, b) => {
    if (a[sortBy.columnId] < b[sortBy.columnId]) {
      return sortBy.sortOrder === "a" ? -1 : 1;
    }
    if (a[sortBy.columnId] > b[sortBy.columnId]) {
      return sortBy.sortOrder === "a" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                let arrowDirection = "";
                if (sortBy.columnId === column.id) {
                  arrowDirection = sortBy.sortOrder;
                }
                return (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: "150px" }}
                    onClick={() => changeSortOrder(column.id)}
                  >
                    {column.label}
                    {arrowDirection === "a" ? (
                      <KeyboardArrowDownIcon />
                    ) : arrowDirection === "d" ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      ""
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                if (filter) {
                  if (row.address_end_date > new Date().toISOString()) {
                    return <RenderTable key={i} row={row} index={i} />;
                  }
                  return null;
                } else {
                  return <RenderTable key={i} row={row} index={i} />;
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default ShowAllData;
