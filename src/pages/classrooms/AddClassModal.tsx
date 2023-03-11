import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  TextField,
  Box,
  Select,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, DeleteOutline } from "@mui/icons-material";
import { Classroom, Subject, Teacher } from "../../types/types";
import {
  useAddSubjectMutation,
  useCreateClassroomMutation,
  useRemoveSubjectMutation,
  useUpdateClassroomMutation,
} from "./classroomApiSlice";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { useGetTeachersQuery } from "../teachers/teachersApiSlice";
import { useMemo, useState } from "react";
import { useGetSubjectsQuery } from "../subjects/subjectApiSlice";
import LoadingButton from "../../components/LoadingButton";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  focusedClassroom?: Classroom | null;
}

const validationSchema = yup.object({
  classroomName: yup.string().required("Name is required"),
  teacher: yup.number().required("Teacher is required"),
});

export default function AddClassModal({
  open,
  handleClose,
  focusedClassroom,
}: ComponentProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | number>(
    ""
  );
  const [createClassroom, { isLoading: isCreating }] =
    useCreateClassroomMutation();
  const [updateClaroom, { isLoading: isUpdating }] =
    useUpdateClassroomMutation();
  const [addSubject, { isLoading: isAddingSubject }] = useAddSubjectMutation();
  const [removeSubject, { isLoading: isRemovingSubject }] =
    useRemoveSubjectMutation();

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

  const subjects = useMemo(() => {
    if (subjectsData?.data?.length) {
      return subjectsData.data;
    }
    return [];
  }, [subjectsData]);

  console.log(focusedClassroom);

  const formik = useFormik({
    initialValues: {
      classroomName: focusedClassroom?.name || "",
      teacher: focusedClassroom?.teacher_id || 0,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.classroomName,
        teacher_id: values.teacher,
      };
      if (focusedClassroom) {
        handleUpdateClassroom(data);
      } else {
        handleCreateClassroom(data);
      }
    },
  });

  const handleCreateClassroom = async (data: Classroom) => {
    try {
      const res = await createClassroom(data).unwrap();
      console.log("res", res);
      toast("classroom created successfully");
      handleClose();
    } catch (error) {
      console.log("error caught", error);
    }
  };

  const handleUpdateClassroom = async (data: Classroom) => {
    try {
      const res = await updateClaroom({
        id: focusedClassroom?.id,
        body: { name: data.name, teacher_id: data.teacher_id },
      }).unwrap();
      console.log("res", res);
      toast("classroom updated successfully");
      handleClose();
    } catch (error) {
      console.log("error caught", error);
    }
  };

  const handleAddSubject = async () => {
    try {
      const res = await addSubject({
        id: focusedClassroom?.id,
        body: { subject_id: selectedSubjectId },
      }).unwrap();
      console.log(res);
      toast("classroom created successfully");
    } catch (error) {
      toast("error addidng subject");
      console.log("error");
    }
  };
  const handleRemoveSubject = async (data: Subject) => {
    try {
      const res = await removeSubject({
        id: focusedClassroom?.id,
        body: { subject_id: data.id },
      }).unwrap();
      console.log(res);
      toast("classroom created successfully");
    } catch (error) {
      toast("error addidng subject");
      console.log("error");
    }
  };

  // const handleClose = () => {
  //   formik.resetForm();
  //   close();
  // };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {Boolean(focusedClassroom) ? "Update" : "Create"} Classroom
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
          {/* add subject area */}
          {Boolean(focusedClassroom) && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Stack direction={"row"} gap={1}>
                <Select
                  displayEmpty
                  fullWidth
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">Select Subject</MenuItem>
                  {subjects?.map((item: Subject) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <LoadingButton
                  size="small"
                  variant="contained"
                  onClick={handleAddSubject}
                  loading={isAddingSubject}
                >
                  Add
                </LoadingButton>
              </Stack>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell align="left">Subject</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {focusedClassroom?.subjects?.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="right">
                        <DeleteOutline
                          color="error"
                          onClick={() => handleRemoveSubject(row)}
                        />
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
            <LoadingButton
              loading={isCreating || isUpdating}
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
