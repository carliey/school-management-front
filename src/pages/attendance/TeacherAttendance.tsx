import {
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Student } from "../../types/types";
import { useGetStudentsByClassroomQuery } from "../students/studentApiSlice";
import TakeAttendanceModal from "./TakeAttendanceModal";

type Props = {};
type Attendance = {
  id?: number;
  student: Student;
  is_present: boolean;
  date: string;
};

const TeacherAttendance = (props: Props) => {
  const { classroomId } = useParams();

  const classId: number | undefined =
    typeof classroomId === "string" ? parseInt(classroomId) : 0;

  const [openTakeAttendance, setOpenTakeAttendance] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );

  const { data: studentsData, isFetching: isLoadingStudents } =
    useGetStudentsByClassroomQuery(classId);

  const students = useMemo(() => {
    if (studentsData?.data?.length) {
      return studentsData?.data;
    }
    return [];
  }, [studentsData]);

  console.log(classId);

  const handleClose = () => {
    setOpenTakeAttendance(false);
  };

  const attendance: Attendance[] = [
    {
      id: 1,
      student: {
        id: 2,
        firstname: "musa",
        lastname: "awwal",
        gender: "f",
        classroom_id: 2,
        dob: "23/23/23",
        soo: "kaduna",
      },
      is_present: true,
      date: "12/12/12",
    },
    {
      id: 1,
      student: {
        id: 2,
        firstname: "bala",
        lastname: "hadiza",
        gender: "f",
        classroom_id: 2,
        dob: "23/23/23",
        soo: "kaduna",
      },
      is_present: true,
      date: "12/12/12",
    },
    {
      id: 1,
      student: {
        id: 2,
        firstname: "jamila",
        lastname: "hasir",
        gender: "f",
        classroom_id: 2,
        dob: "23/23/23",
        soo: "kaduna",
      },
      is_present: true,
      date: "12/12/12",
    },
  ];

  return (
    <Box>
      <TakeAttendanceModal
        open={openTakeAttendance}
        handleClose={handleClose}
        students={students}
      />
      <Stack direction={"row"} justifyContent="space-between">
        <Stack direction={"row"} alignItems="center">
          <Typography>View For:</Typography>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e: any) => setSelectedDate(e.target.value)}
          />
        </Stack>
        <Button variant="contained" onClick={() => setOpenTakeAttendance(true)}>
          Take for Today
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
        <Typography>Classname attendace for: {selectedDate}</Typography>
        {!attendance?.length ? (
          <Typography>attendance for {selectedDate} not found</Typography>
        ) : (
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
              {attendance.map((row: Attendance, i: number) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{i + 1}</TableCell>
                  <TableCell align="left">{row.student.id}</TableCell>
                  <TableCell align="left">{row.student.firstname}</TableCell>
                  <TableCell align="left">{row.student.lastname}</TableCell>
                  <TableCell align="left">
                    {row.is_present ? "present" : "absent"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default TeacherAttendance;
