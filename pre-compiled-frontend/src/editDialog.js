import * as React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
  Box,
  MenuItem,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useSWRConfig } from "swr";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#131c38",
  },
  button: {
    color: "#ffffff",
  },
});

const statuses = [
  { value: "completed", label: "Completed" },
  { value: "onTrack", label: "On Track" },
  { value: "delayed", label: "Delayed" },
  { value: "committed", label: "Committed" },
  { value: "proposed", label: "Proposed" },
];
export default function App({ data }) {
  const classes = useStyles();

  const { mutate } = useSWRConfig();

  const [editItemOpen, setEditItemOpen] = React.useState(false);

  const handleEditItemClickOpen = () => {
    setEditItemOpen(true);
  };

  const handleEditItemClose = () => {
    setEditItemOpen(false);
  };
  const handleEditItemSubmit = () => {
    setEditItemOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        onClick={handleEditItemClickOpen}
        className={classes.button}
        color="primary"
        variant="outlined"
        style={{ marginLeft: "5px" }}
      >
        Edit
      </Button>
      <Dialog
        aria-labelledby="edit-item"
        open={editItemOpen}
        onClose={handleEditItemClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Edit Initiative</DialogTitle>
        <Formik
          initialValues={{
            category: data.category,
            initiatives: data.initiatives,
            experience_focus_area: data.experience_focus_area,
            entity_kpi: data.entity_kpi,
            kpi: data.kpi,
            actual: data.actual,
            target: data.target,
            status: data.status,
            deliveryDate: new Date(data.delivery_date),
          }}
          validate={(values) => {
            const errors = {};

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              setSubmitting(false);
              //alert(JSON.stringify(values, null, 2));

              const url = "https://192.168.1.146:8080/api/table";
              const options = {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({ values }),
              };

              fetch(`${url}/${data.id}`, options)
                .then((response) => response.json()) // one extra step
                .then(() => mutate(`https://192.168.1.146:8080/api/table`))
                .catch((error) => console.error(error));
              handleEditItemClose();
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting, touched, errors }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Form>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          disabled
                          type="text"
                          label="Category"
                          name="category"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          disabled
                          type="text"
                          label="Initiatives"
                          name="initiatives"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          disabled
                          type="text"
                          label="Experience Focus Areas"
                          name="experience_focus_area"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          disabled
                          type="text"
                          label="Entity KPI"
                          name="entity_kpi"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          disabled
                          type="text"
                          label="KPI"
                          name="kpi"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          type="text"
                          label="Actual"
                          name="actual"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
                          disabled
                          type="text"
                          label="Target"
                          name="target"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          type="text"
                          name="status"
                          label="With Select"
                          select
                          fullWidth
                          variant="standard"
                          helperText="Please select Status"
                          margin="none"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        >
                          {statuses.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={DatePicker}
                          fullWidth
                          name="deliveryDate"
                          label="Delivery Date"
                          disabled
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </DialogContent>

                {isSubmitting && <LinearProgress />}

                <DialogActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={handleEditItemClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            </MuiPickersUtilsProvider>
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
}
