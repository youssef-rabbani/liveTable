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
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useSWRConfig } from "swr";
import http from "./http-common";

export default function App({ data }) {
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
  console.log(data);
  return (
    <React.Fragment>
      <Button
        onClick={handleEditItemClickOpen}
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
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
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
              await http.put(`table/${data.id}`, values);
              mutate(`/table`);
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
                          type="text"
                          label="experience Focus Areas"
                          name="experience_focus_area"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box margin={1}>
                        <Field
                          component={TextField}
                          fullWidth
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
                          fullWidth
                          type="text"
                          label="Status"
                          name="status"
                        />
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
