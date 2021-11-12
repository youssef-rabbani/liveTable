import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import useSWR, { useSWRConfig } from "swr";
import EditDialog from "./editDialog";
import AddDialog from "./addDialog";
import DeleteDialog from "./deleteDialog";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";

const useStyles = makeStyles({
  table: {
    backgroundColor: "#131c38",
  },
  text: {
    color: "#ffffff",
  },
  action: {
    marginBottom: "12px",
  },
  cell: {
    width: "150px",
    maxWidth: "150px",
  },
});
const statuses = {
  completed: "Completed",
  onTrack: "On Track",
  delayed: "Delayed",
  committed: "Committed",
  propposed: "Propposed",
};
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

const fetcherSWR = (url) => fetch(url, options).then((r) => r.json());

const App = ({ data, dimKey, measKeys }) => {
  const classes = useStyles();

  const { data: tableData, error } = useSWR(
    "https://192.168.1.146:8080/api/table",
    fetcherSWR
  );
  if (error) return <div>failed to load</div>;
  if (!tableData) return <div>loading...</div>;
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} className={classes.action}>
          <AddDialog />
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}align="center" component="th" scope="row">
                    <Typography className={classes.text} variant="h6">
                      Category
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.cell}
                    component="th"
                    scope="row"
                  >
                    <Typography className={classes.text}variant="h6"> Initiatives</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6">Experience Focus Area</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6">Entity KPI</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6">KPI</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6">Actual</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6">Target</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6">Delivery Date</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6">Status</Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6"> </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.text}
                    component="th"
                    scope="row"
                  >
                    <Typography variant="h6"></Typography>
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
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">{row.category}</Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">
                          {row.initiatives}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">
                          {row.experience_focus_area}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">
                          {row.entity_kpi}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">{row.kpi}</Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1"> {row.actual}</Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">{row.target}</Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">
                          {new Date(row.delivery_date)
                            .toISOString()
                            .substr(0, 10)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={classes.text}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography variant="body1">
                          {statuses[row.status]}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        <EditDialog data={row} />
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        <DeleteDialog id={row.id} />
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
};

export default App;
