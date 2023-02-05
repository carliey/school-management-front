import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Select, MenuItem, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  classroom: yup.string().required("Email is required"),
});

export default function CreateTeacherModal({
  open,
  handleClose,
}: ComponentProps) {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      classroom: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const classrooms = [
    { id: 1, name: "primary one" },
    { id: 2, name: "primary two" },
    { id: 3, name: "primary three" },
  ];
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Teacher</DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit} p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="firstname"
                name="firstname"
                label="First name *"
                variant="outlined"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="middlename"
                name="middlename"
                label="Middle name"
                variant="outlined"
                value={formik.values.middlename}
                onChange={formik.handleChange}
                error={
                  formik.touched.middlename && Boolean(formik.errors.middlename)
                }
                helperText={
                  formik.touched.middlename && formik.errors.middlename
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="lastname"
                name="lastname"
                label="Last name *"
                variant="outlined"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="phone"
                name="phone"
                label="Phone *"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="email"
                label="Email "
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                displayEmpty
                fullWidth
                id="gender"
                name="gender"
                label="Gender *"
                variant="outlined"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <MenuItem value="">Select gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                displayEmpty
                fullWidth
                id="classroom"
                name="classroom"
                label="Classroom *"
                variant="outlined"
                value={formik.values.classroom}
                onChange={formik.handleChange}
                error={
                  formik.touched.classroom && Boolean(formik.errors.classroom)
                }
              >
                <MenuItem value="">Select Classroom</MenuItem>
                {classrooms.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Stack gap={2} direction="row" justifyContent={"flex-end"} mt={2}>
            <Button variant="contained" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}
