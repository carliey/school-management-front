import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Select, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, DeleteOutline } from "@mui/icons-material";
import { Classroom, Teacher } from "../../types/types";
import { useCreateClassroomMutation } from "./classroomApiSlice";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useGetTeachersQuery } from "../teachers/teachersApiSlice";
import { useMemo } from "react";
import { useGetSubjectsQuery } from "../subjects/subjectApiSlice";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  focusedSubject?: Classroom | null;
}

const validationSchema = yup.object({
  classroomName: yup.string().required("Name is required"),
  teacher: yup.number().required("Teacher is required"),
});

export default function AddClassModal({
  open,
  handleClose,
  focusedSubject,
}: ComponentProps) {
  const [createClassroom] = useCreateClassroomMutation();
  const { data: teachersData } = useGetTeachersQuery();
  const { data: subjectsData } = useGetSubjectsQuery();

  const teachers = useMemo(
    () =>
      teachersData?.data?.map(
        (teacher: Teacher) =>
          ({
            id: teacher.id,
            name: teacher.firstname + " " + teacher.lastname,
          } || [])
      ),
    [teachersData]
  );

  const subjects = [
    { id: 1, name: "maths" },
    { id: 2, name: "english" },
    { id: 3, name: "physics" },
  ];

  const formik = useFormik({
    initialValues: {
      classroomName: "",
      teacher: 0,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("submitted");
      handleCreateClassroom({
        name: values.classroomName,
        teacher_id: values.teacher,
      });
    },
  });

  const handleCreateClassroom = async (data: Classroom) => {
    try {
      const res = await createClassroom(data).unwrap();
      console.log("res", res);
      toast("classroom created successfully");
    } catch (error) {
      console.log("error caught", error);
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
        <DialogTitle>
          {Boolean(focusedSubject) ? "Update" : "Create"} Classroom
        </DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="classroomName"
                name="classroomName"
                label="Classroom Name *"
                variant="outlined"
                value={formik.values.classroomName}
                onChange={formik.handleChange}
                error={
                  formik.touched.classroomName &&
                  Boolean(formik.errors.classroomName)
                }
                helperText={
                  formik.touched.classroomName && formik.errors.classroomName
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select
                displayEmpty
                fullWidth
                id="teacher"
                name="teacher"
                label="Teacher *"
                variant="outlined"
                value={formik.values.teacher}
                onChange={formik.handleChange}
                error={formik.touched.teacher && Boolean(formik.errors.teacher)}
              >
                <MenuItem value={0}>Select Teacher</MenuItem>

                {teachers?.map((teacher: any) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          {Boolean(focusedSubject) && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Stack direction={"row"} gap={1}>
                <Select displayEmpty fullWidth defaultValue={""} size="small">
                  <MenuItem value="">Select Subject</MenuItem>
                  {teachers?.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <Button size="small" variant="contained">
                  Add
                </Button>
              </Stack>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="right">
                        <DeleteOutline />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
