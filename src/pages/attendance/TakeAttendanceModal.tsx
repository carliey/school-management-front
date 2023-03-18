import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  TextField,
  Box,
  Stack,
  Typography,
  LinearProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Attendance, Student, Subject } from "../../types/types";
import { useFormik } from "formik";
import * as yup from "yup";

import { toast } from "react-hot-toast";
import LoadingButton from "../../components/LoadingButton";
import React from "react";
import { useCreateAttendanceMutation } from "./attendanceApiSlice";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  students?: Student[];
}

type attendance = {
  is_present: boolean;
} & Student;

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function TakeAttendanceModal({
  open,
  handleClose,
  students,
}: ComponentProps) {
  const [createAttendance, { isLoading: isCreatingAttendace }] =
    useCreateAttendanceMutation();

  const [attendanceList, setAttendanceList] = React.useState<attendance[] | []>(
    students?.map((student: Student) => ({ ...student, is_present: false })) ||
      []
  );

  const handleChange = (value: boolean, index: number, row: attendance) => {
    let booleanValue =
      typeof value === "string" ? (value === "true" ? true : false) : value;

    let newAttendanceList = attendanceList;
    let newRow = { ...row, is_present: booleanValue };
    newAttendanceList[index] = newRow;
    setAttendanceList([...newAttendanceList]);
  };

  const handleSave = () => {
    attendanceList.forEach((item) => {
      const body = {
        date: new Date().toLocaleDateString(),
        is_present: item.is_present,
        classroom_id: item.classroom_id,
        student_id: item.id,
      };
      console.log(body);
      handleCreateAttendance(body);
    });
  };

  const handleCreateAttendance = async (data: Attendance) => {
    try {
      const res = await createAttendance(data).unwrap();
      console.log(res);
      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("attendance created successfully");
      handleClose();
    } catch (error: any) {
      toast.error(error?.message || "error");
      console.log("caught", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      fullWidth
    >
      {/* {(isCreating || isUpdating) && <LinearProgress />} */}
      <DialogTitle>{false ? "Update" : "Create"} Attendance</DialogTitle>
      <Box p={3}>
        <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
          <Typography>Attendance sheet</Typography>
          {
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell align="left">student ID</TableCell>
                  <TableCell align="left">First name</TableCell>
                  <TableCell align="left">Last name</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceList?.map((row: attendance, i: number) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row">{i + 1}</TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.firstname}</TableCell>
                    <TableCell align="left">{row.lastname}</TableCell>
                    <TableCell align="left">
                      <RadioGroup
                        row
                        name="controlled-radio-buttons-group"
                        value={row.is_present}
                        onChange={(e: any) =>
                          handleChange(e.target.value, i, row)
                        }
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="present"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="absent"
                        />
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        </TableContainer>

        <Stack gap={2} direction="row" justifyContent={"flex-end"} mt={2}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={false}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </Dialog>
  );
}
