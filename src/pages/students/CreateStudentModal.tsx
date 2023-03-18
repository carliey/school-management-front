import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Select, MenuItem, Stack } from "@mui/material";
import { Classroom, Student } from "../../types/types";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useCreateStudentMutation } from "./studentApiSlice";
import LoadingButton from "../../components/LoadingButton";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  classrooms: Classroom[];
}
const validationSchema = yup.object({
  // email: yup
  //   .string()
  //   .email("Enter a valid email")
  //   .required("Email is required"),
  // classroom: yup.string().required("Email is required"),
});

export default function CreateStudentModal({
  open,
  handleClose,
  classrooms,
}: ComponentProps) {
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      dob: "",
      soo: "",
      gender: "",
      classroom_id: null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCreateStudent(values);
    },
  });

  const handleCreateStudent = async (data: Student) => {
    toast.loading("Loading");
    console.log("data", data);
    try {
      const res = await createStudent(data).unwrap();
      if (res.error) {
        throw res.error;
      }
      console.log(res.status);
      toast.success("Student created successfully");
      handleClose();
      formik.resetForm();
    } catch (error) {
      toast.error("error creating Student");
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
        <DialogTitle>Create Student</DialogTitle>

        <Box component="form" onSubmit={formik.handleSubmit} p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
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

            <Grid item xs={12} sm={6} lg={4}>
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
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                type={"date"}
                id="outlined-basic"
                label="DOB"
                variant="outlined"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                id="soo"
                label="State of origin "
                variant="outlined"
                name="soo"
                value={formik.values.soo}
                onChange={formik.handleChange}
                error={formik.touched.soo && Boolean(formik.errors.soo)}
                helperText={formik.touched.soo && formik.errors.soo}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select
                displayEmpty
                fullWidth
                name="gender"
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
                name="classroom_id"
                value={formik.values.classroom_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.classroom_id &&
                  Boolean(formik.errors.classroom_id)
                }
              >
                <MenuItem value="">Select Classroom</MenuItem>
                {classrooms.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
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
            <LoadingButton
              loading={isCreating}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </LoadingButton>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}
