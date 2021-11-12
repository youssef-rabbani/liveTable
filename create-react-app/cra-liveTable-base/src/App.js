import "./App.css";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import useSWR, { useSWRConfig } from "swr";
import http from "./http-common";
import EditDialog from "./editDialog";
import AddDialog from "./addDialog";
import DeleteDialog from "./deleteDialog";

const fetcher = (url) => http.get(url).then((res) => res.data);

export default function BasicTable({ data, dimKey, measKeys }) {

  const { data: tableData, error } = useSWR("/table", fetcher);
  if (error) return <div>failed to load</div>;
  if (!tableData) return <div>loading...</div>;
  console.log(tableData);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <AddDialog />
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/*tableData.map((element) => {
                    return (
                      <TableCell align="center" component="th" scope="row">
                        {element}
                      </TableCell>
                    );
                  })*/}
                  <TableCell align="center" component="th" scope="row">
                    Category
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Initiatives
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Experience Focus Area
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Entity KPI
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    KPI
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Actual
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Target
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Delivery Date
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Status
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Action
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.initiatives}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.experience_focus_area}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.entity_kpi}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.kpi}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.actual}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.target}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        { new Date(row.delivery_date).toISOString().substr(0,10)}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.status}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        <EditDialog data={row}/>
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        <DeleteDialog id={row.id}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
