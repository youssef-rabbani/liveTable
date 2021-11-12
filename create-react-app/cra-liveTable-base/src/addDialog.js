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
  Box
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useSWRConfig } from "swr";
import http from "./http-common";

export default function App() {
  const { mutate } = useSWRConfig();

  const [addItemOpen, setAddItemOpen] = React.useState(false);

  const handleAddItemClickOpen = () => {
    setAddItemOpen(true);
  };

  const handleAddItemClose = () => {
    setAddItemOpen(false);
  };
  const handleAddItemSubmit = () => {
    setAddItemOpen(false);
  };
  /* const addFormik = useFormik({
    initialValues: {
      id: "",
      category: "",
      initiatives: "",
      experienceFocusAreas: "",
      entityKPI: "",
      kpi: "",
      actual: "",
      target: "",
      deliveryDate: "",
      status: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });*/
  return (
    <React.Fragment>
      <Button
        onClick={handleAddItemClickOpen}
        color="primary"
        variant="contained"
        style={{ marginLeft: "5px" }}
      >
        Add
      </Button>
      <Dialog
        aria-labelledby="add-item"
        open={addItemOpen}
        onClose={handleAddItemClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Add</DialogTitle>
        <Formik
          initialValues={{
            category: "",
            initiatives: "",
            experienceFocusAreas: "",
            entityKPI: "",
            kpi: "",
            actual: "",
            target: "",
            status: "",
            deliveryDate: new Date(),
          }}
          validate={(values) => {
            const errors = {};

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async() => {
              setSubmitting(false);
              //alert(JSON.stringify(values, null, 2));
              await http.post('/table',{values});
              mutate(`/table`)
              handleAddItemClose();
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
                          name="experienceFocusAreas"
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
                          name="entityKPI"
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
                    onClick={handleAddItemClose}
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
