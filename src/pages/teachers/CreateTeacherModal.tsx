import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Select, MenuItem, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Classroom, Teacher } from "../../types/types";
import { useCreateTeacherMutation } from "./teachersApiSlice";
import { toast } from "react-hot-toast";
import { useGetClassroomsQuery } from "../classrooms/classroomApiSlice";
import { useMemo } from "react";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  focusedTeacher: Teacher | null;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  // classroom: yup.string().required("Email is required"),
});

export default function CreateTeacherModal({
  open,
  handleClose,
  focusedTeacher,
}: ComponentProps) {
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const { data: classroomsRes } = useGetClassroomsQuery();
  const classrooms: any[] = useMemo(() => {
    return classroomsRes?.data?.length ? classroomsRes.data : [];
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: focusedTeacher?.firstname || "",
      lastname: focusedTeacher?.lastname || "",
      email: focusedTeacher?.email || "",
      phone: focusedTeacher?.phone || 0,
      gender: focusedTeacher?.gender || "",
      // classroom: focusedTeacher?.classroom || [],
      // password: focusedTeacher?.password || "",
      roles: ["teacher"],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (Boolean(focusedTeacher)) {
        handleUpdateTeacher(values);
      } else {
        handleCreateTeacher(values);
      }
    },
  });

  const handleCreateTeacher = async (data: Teacher) => {
    toast.loading("Loading");
    try {
      const res = await createTeacher(data).unwrap();
      if (res.error) {
        throw res.error;
      }
      console.log(res.status);
      toast.success("teacher created successfully");
    } catch (error) {
      toast.error("error creating teacher");
      console.log(error);
    }
  };

  const handleUpdateTeacher = async (data: Teacher) => {
    toast.loading("Loading");
    try {
      // const res = await createTeacher(data).unwrap();
      // if (res.error) {
      //   throw res.error;
      // }
      // console.log(res.status);
      toast.success("teacher updated successfully");
    } catch (error) {
      toast.error("error updating teacher");
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {Boolean(focusedTeacher) ? "Update" : "Create"} Teacher
        </DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit} p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
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

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
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
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
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

            <Grid item xs={12} md={6} lg={6}>
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
              <TextField
                fullWidth
                id="email"
                label="Email "
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            {/* <Grid item xs={12}>
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
                {classrooms.map((item: Classroom) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid> */}
          </Grid>
          <Stack gap={2} direction="row" justifyContent={"flex-end"} mt={2}>
            <Button variant="contained" color="error" onClick={handleClose}>
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
