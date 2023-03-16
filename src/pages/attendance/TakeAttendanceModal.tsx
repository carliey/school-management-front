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
import { Student, Subject } from "../../types/types";
import { useFormik } from "formik";
import * as yup from "yup";

import { toast } from "react-hot-toast";
import LoadingButton from "../../components/LoadingButton";
import React from "react";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  students?: Student[];
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function TakeAttendanceModal({
  open,
  handleClose,
  students,
}: ComponentProps) {
  //   const handleCreateSubject = async (data: Subject) => {
  //     try {
  //       const res = await createSubject(data).unwrap();
  //       console.log(res);
  //       toast.success("subject created successfully");
  //       handleClose();
  //     } catch (error) {
  //       toast.error("Error");
  //       console.log("caught", error);
  //     }
  //   };

  //   const handleUpdateSubject = async (data: Subject) => {
  //     try {
  //       const res = await updateSubject({
  //         id: focusedSubject?.id,
  //         body: data,
  //       }).unwrap();
  //       console.log(res);
  //       toast.success("subject updated successfully");
  //       handleClose();
  //     } catch (error) {
  //       toast.error("Error");
  //       console.log("caught", error);
  //     }
  //   };

  const [value, setValue] = React.useState(true);

  const handleChange = (event: any) => {
    setValue(event.target.value);
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
                {students?.map((row: Student, i: number) => (
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
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="present"
                        />
                        <FormControlLabel
                          value={true}
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
          >
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </Dialog>
  );
}
